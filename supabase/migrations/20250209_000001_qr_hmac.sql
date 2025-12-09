-- ============================================
-- QR robusto con short_hash + HMAC en Supabase
-- Incluye tablas, enum, helpers criptográficos y RPC
-- ============================================

-- Dependencias
create extension if not exists "pgcrypto" with schema extensions;

-- Limpieza previa (mantener idempotencia de prueba)
drop function if exists public.redeem_valid_qr(text) cascade;
drop function if exists public.generate_valid_qr(text, boolean) cascade;
drop function if exists public.generate_promo_qr(text) cascade;
drop function if exists public.get_qr_history(integer) cascade;
drop function if exists public.get_active_valid_qr(text) cascade;
drop function if exists public.compute_qr_status(qr_status, timestamptz) cascade;
drop function if exists public.current_usuario_id() cascade;
drop function if exists public.sign_qr(text, integer) cascade;
drop function if exists public.short_hash(text, integer) cascade;
drop function if exists public.base64url_encode(bytea) cascade;
drop type if exists public.qr_status cascade;
drop table if exists public.qr_validos cascade;
drop table if exists public.escaneos cascade;

-- Enum de estado
create type public.qr_status as enum ('valido', 'canjeado', 'expirado');

-- Helpers criptográficos
create or replace function public.base64url_encode(input bytea)
returns text
language sql
immutable
as $$
  select translate(encode(input, 'base64'), '+/', '-_')::text;
$$;

create or replace function public.short_hash(input text, length int default 4)
returns text
language sql
immutable
as $$
  -- Usamos digest de pgcrypto (schema extensions) y casteamos a bytea
  select substr(
    public.base64url_encode(extensions.digest(input::bytea, 'sha256')),
    1,
    length
  );
$$;

create or replace function public.sign_qr(payload text, length int default 8)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  secret text;
  sig text;
begin
  secret := current_setting('app.qr_secret', true);
  if secret is null or secret = '' then
    raise exception 'QR secret (app.qr_secret) no configurada en el backend';
  end if;

  -- Usamos hmac de pgcrypto (schema extensions) y casteamos payload/secret a bytea
  sig := public.base64url_encode(extensions.hmac(payload::bytea, secret::bytea, 'sha256'));
  sig := regexp_replace(sig, '=', '', 'g');
  return substr(sig, 1, length);
end;
$$;

create or replace function public.current_usuario_id()
returns text
language sql
stable
as $$
  select u.id from public.usuarios u where u.id_auth = auth.uid();
$$;

create or replace function public.compute_qr_status(p_status public.qr_status, p_expires_at timestamptz)
returns public.qr_status
language sql
volatile
as $$
  select (
    case
      when p_status = 'canjeado' then 'canjeado'::public.qr_status
      when now() > p_expires_at then 'expirado'::public.qr_status
      else 'valido'::public.qr_status
    end
  );
$$;

-- Tabla principal de QR válidos (dinámicos)
create table public.qr_validos (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  promo_id text not null references public.promos(id) on delete cascade,
  negocio_id text not null references public.negocios(id) on delete cascade,
  cliente_id text not null references public.usuarios(id) on delete cascade,
  ts_epoch bigint not null,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  redeemed_at timestamptz,
  status public.qr_status not null default 'valido',
  biz_hash text not null,
  promo_hash text not null,
  user_hash text not null,
  signature text not null,
  redeemed_by text references public.usuarios(id),
  constraint ck_qr_valid_prefix check (code like 'qrv-%'),
  constraint ck_qr_expires check (expires_at >= created_at)
);

create index idx_qr_validos_cliente_status on public.qr_validos (cliente_id, status, expires_at desc);
create index idx_qr_validos_promo_status on public.qr_validos (promo_id, status, expires_at desc);
create index idx_qr_validos_negocio_status on public.qr_validos (negocio_id, status, expires_at desc);
create index idx_qr_validos_code on public.qr_validos (code);

-- RLS
alter table public.qr_validos enable row level security;

-- Cliente puede ver sus QR
create policy qr_validos_select_cliente on public.qr_validos
  for select using (
    exists (
      select 1 from public.usuarios u
      where u.id = cliente_id
        and u.id_auth = auth.uid()
    )
    or exists (
      select 1 from public.negocios n
      join public.usuarios u on u.id = n.usuarioId
      where n.id = negocio_id
        and u.id_auth = auth.uid()
    )
  );

-- Cliente inserta sus propios QR (vía RPC)
create policy qr_validos_insert_cliente on public.qr_validos
  for insert to authenticated
  with check (
    exists (
      select 1 from public.usuarios u
      where u.id = cliente_id
        and u.id_auth = auth.uid()
    )
  );

-- Negocio puede actualizar QR de su negocio (canje)
create policy qr_validos_update_negocio on public.qr_validos
  for update to authenticated
  using (
    exists (
      select 1 from public.negocios n
      join public.usuarios u on u.id = n.usuarioId
      where n.id = qr_validos.negocio_id
        and u.id_auth = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.negocios n
      join public.usuarios u on u.id = n.usuarioId
      where n.id = qr_validos.negocio_id
        and u.id_auth = auth.uid()
    )
  );

-- Cliente puede actualizar su propio QR (p.ej. invalidar). No se usa en UI pero evita bloqueos.
create policy qr_validos_update_cliente on public.qr_validos
  for update to authenticated
  using (
    exists (
      select 1 from public.usuarios u
      where u.id = qr_validos.cliente_id
        and u.id_auth = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.usuarios u
      where u.id = qr_validos.cliente_id
        and u.id_auth = auth.uid()
    )
  );

-- RPC: QR de promo estático (qrs-{biz}-{prm}-{usr}-{h8})
create or replace function public.generate_promo_qr(p_promo_id text)
returns table(code text, promo_id text, negocio_id text, user_id text, signature text)
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  cliente text;
  negocio text;
  biz text;
  prm text;
  usr text;
  sig text;
begin
  if uid is null then
    raise exception 'not_authenticated';
  end if;

  select u.id into cliente from public.usuarios u where u.id_auth = uid;
  if cliente is null then
    raise exception 'user_not_found';
  end if;

  select p.negocioId into negocio from public.promos p where p.id = p_promo_id;
  if negocio is null then
    raise exception 'promo_not_found';
  end if;

  biz := public.short_hash(negocio);
  prm := public.short_hash(p_promo_id);
  usr := public.short_hash(cliente);
  sig := public.sign_qr(biz || prm || usr, 8);

  code := format('qrs-%s-%s-%s-%s', biz, prm, usr, sig);
  promo_id := p_promo_id;
  negocio_id := negocio;
  user_id := cliente;
  signature := sig;
  return next;
end;
$$;

-- RPC: generar QR válido (dinámico qrv-*)
create or replace function public.generate_valid_qr(p_promo_id text, p_force boolean default false)
returns public.qr_validos
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  cliente text;
  negocio text;
  ts bigint;
  biz text;
  prm text;
  usr text;
  sig text;
  expires timestamptz;
  existing public.qr_validos;
  result public.qr_validos;
begin
  if uid is null then
    raise exception 'not_authenticated';
  end if;

  select u.id into cliente from public.usuarios u where u.id_auth = uid;
  if cliente is null then
    raise exception 'user_not_found';
  end if;

  select p.negocioId into negocio from public.promos p where p.id = p_promo_id;
  if negocio is null then
    raise exception 'promo_not_found';
  end if;

  update public.qr_validos
    set status = 'expirado'
    where status = 'valido'
      and expires_at < now()
      and cliente_id = cliente
      and promo_id = p_promo_id;

  select *
    into existing
    from public.qr_validos
    where cliente_id = cliente
      and promo_id = p_promo_id
      and status = 'valido'
      and expires_at > now()
    order by created_at desc
    limit 1;

  if existing.id is not null and not p_force then
    return existing;
  end if;

  ts := floor(extract(epoch from now()));
  biz := public.short_hash(negocio);
  prm := public.short_hash(p_promo_id);
  usr := public.short_hash(cliente);
  sig := public.sign_qr(biz || prm || usr || ts::text, 8);
  expires := to_timestamp(ts) + interval '30 minutes';

  insert into public.qr_validos (
    code,
    promo_id,
    negocio_id,
    cliente_id,
    ts_epoch,
    created_at,
    expires_at,
    status,
    biz_hash,
    promo_hash,
    user_hash,
    signature
  )
  values (
    format('qrv-%s-%s-%s-%s-%s', biz, prm, usr, ts::text, sig),
    p_promo_id,
    negocio,
    cliente,
    ts,
    to_timestamp(ts),
    expires,
    'valido',
    biz,
    prm,
    usr,
    sig
  )
  returning * into result;

  return result;
end;
$$;

-- RPC: obtener QR vigente sin generar uno nuevo
create or replace function public.get_active_valid_qr(p_promo_id text)
returns public.qr_validos
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  cliente text;
  result public.qr_validos;
begin
  if uid is null then
    raise exception 'not_authenticated';
  end if;

  select u.id into cliente from public.usuarios u where u.id_auth = uid;
  if cliente is null then
    raise exception 'user_not_found';
  end if;

  update public.qr_validos
    set status = 'expirado'
    where status = 'valido'
      and expires_at < now()
      and cliente_id = cliente
      and promo_id = p_promo_id;

  select *
    into result
    from public.qr_validos
    where cliente_id = cliente
      and promo_id = p_promo_id
      and status = 'valido'
      and expires_at > now()
    order by created_at desc
    limit 1;

  return result;
end;
$$;

-- RPC: historial del cliente con estado efectivo
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
    n.sector
  from public.qr_validos q
  join public.promos p on p.id = q.promo_id
  join public.negocios n on n.id = q.negocio_id
  where q.cliente_id = cliente
  order by q.created_at desc
  limit p_limit;
end;
$$;

-- RPC: canje/validación de QR por negocio
create or replace function public.redeem_valid_qr(p_code text)
returns table(
  id uuid,
  code text,
  status public.qr_status,
  expires_at timestamptz,
  redeemed_at timestamptz,
  cliente_id text,
  promo_id text,
  negocio_id text,
  promo_titulo text,
  negocio_nombre text,
  cliente_nombre text
) language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  negocio_owner text;
  qr public.qr_validos;
  biz text;
  prm text;
  usr text;
  ts text;
  sig text;
  expected text;
  now_status public.qr_status;
begin
  if uid is null then
    raise exception 'not_authenticated';
  end if;

  select n.id
    into negocio_owner
    from public.negocios n
    join public.usuarios u on u.id = n.usuarioId
    where u.id_auth = uid
    limit 1;

  if negocio_owner is null then
    raise exception 'not_authorized';
  end if;

  if p_code is null or length(p_code) < 12 then
    raise exception 'invalid_code';
  end if;

  if split_part(p_code, '-', 1) <> 'qrv' then
    raise exception 'invalid_prefix';
  end if;

  select split_part(p_code, '-', 2),
         split_part(p_code, '-', 3),
         split_part(p_code, '-', 4),
         split_part(p_code, '-', 5),
         split_part(p_code, '-', 6)
    into biz, prm, usr, ts, sig;

  expected := public.sign_qr(biz || prm || usr || ts, 8);
  if sig <> expected then
    raise exception 'invalid_signature';
  end if;

  select * into qr
    from public.qr_validos
    where code = p_code
    for update;

  if not found then
    raise exception 'qr_not_found';
  end if;

  if qr.negocio_id <> negocio_owner then
    raise exception 'wrong_business';
  end if;

  now_status := public.compute_qr_status(qr.status, qr.expires_at);

  if now_status = 'expirado' then
    update public.qr_validos set status = 'expirado' where id = qr.id;
    status := 'expirado';
    expires_at := qr.expires_at;
    redeemed_at := qr.redeemed_at;
    id := qr.id;
    code := qr.code;
    cliente_id := qr.cliente_id;
    promo_id := qr.promo_id;
    negocio_id := qr.negocio_id;
  elsif now_status = 'canjeado' then
    status := 'canjeado';
    expires_at := qr.expires_at;
    redeemed_at := qr.redeemed_at;
    id := qr.id;
    code := qr.code;
    cliente_id := qr.cliente_id;
    promo_id := qr.promo_id;
    negocio_id := qr.negocio_id;
  else
    update public.qr_validos
      set status = 'canjeado',
          redeemed_at = now(),
          redeemed_by = negocio_owner
      where id = qr.id
      returning id, code, status, expires_at, redeemed_at, cliente_id, promo_id, negocio_id
      into id, code, status, expires_at, redeemed_at, cliente_id, promo_id, negocio_id;
  end if;

  select p.titulo, n.nombre, u.nombre
    into promo_titulo, negocio_nombre, cliente_nombre
    from public.promos p
    join public.negocios n on n.id = qr.negocio_id
    join public.usuarios u on u.id = qr.cliente_id
    where p.id = qr.promo_id;

  return;
end;
$$;

comment on function public.sign_qr is 'Firma HMAC-SHA256 truncada; requiere app.qr_secret configurada en el backend (no se expone a clientes).';
comment on function public.generate_valid_qr is 'Genera un QR dinámico qrv-* (30m). Si existe uno vigente y p_force=false, reutiliza el existente.';
comment on function public.redeem_valid_qr is 'Canje de QR por negocio (verifica HMAC, expiración y marca canjeado).';

-- Nota operativa: configurar el secreto en Postgres (fuera de migraciones)
--   alter role authenticator set app.qr_secret = 'CAMBIAR_AQUI_SECRETO_LARGO';
--   alter database postgres set app.qr_secret = 'CAMBIAR_AQUI_SECRETO_LARGO';
