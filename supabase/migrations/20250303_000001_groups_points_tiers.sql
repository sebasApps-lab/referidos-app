-- ============================================
-- Grupos, ligas (tiers) y motor de puntos
-- Correcciones de escaneos y canje
-- ============================================

create extension if not exists "pgcrypto" with schema extensions;

-- ----------------------------
-- Ligas (tiers) configurables
-- ----------------------------
create table if not exists public.tiers (
  id smallint primary key,
  name text not null,
  min_points int not null,
  max_points int,
  benefits jsonb default '[]'::jsonb,
  created_at timestamptz not null default now()
);

insert into public.tiers (id, name, min_points, max_points, benefits)
values
  (1, 'Explorador', 0, 79, '[]'::jsonb),
  (2, 'Conector', 80, 199, '[]'::jsonb),
  (3, 'Influencer Local', 200, 499, '[]'::jsonb),
  (4, 'Embajador', 500, 999, '[]'::jsonb),
  (5, 'Leyenda de la Ciudad', 1000, 1999, '[]'::jsonb),
  (6, 'Élite Plus', 2000, null, '[]'::jsonb)
on conflict (id) do nothing;

update public.tiers
set name = v.name
from (values
  (1, 'Explorador'),
  (2, 'Conector'),
  (3, 'Influencer Local'),
  (4, 'Embajador'),
  (5, 'Leyenda de la Ciudad'),
  (6, 'Élite Plus')
) as v(id, name)
where public.tiers.id = v.id;

-- ----------------------------
-- Motor de puntos (ledger)
-- ----------------------------
create table if not exists public.points_rules (
  event_type text primary key,
  points int not null,
  created_at timestamptz not null default now()
);

insert into public.points_rules (event_type, points)
values
  ('redeem_base', 20),
  ('group_plus_one', 12),
  ('new_referral_bonus', 30),
  ('weekly_streak_bonus', 25),
  ('first_redeem_of_day', 6),
  ('promo_hard_bonus', 10),
  ('peak_hours_bonus', 5)
on conflict (event_type) do update
  set points = excluded.points;

create table if not exists public.points_ledger (
  id uuid primary key default gen_random_uuid(),
  user_id text not null references public.usuarios(id) on delete cascade,
  points int not null,
  event_type text not null,
  source text,
  source_id text,
  idempotency_key text not null,
  meta jsonb default '{}'::jsonb,
  created_at timestamptz not null default now(),
  constraint points_ledger_idempotency_key_unique unique (idempotency_key)
);

create index if not exists idx_points_ledger_user_id on public.points_ledger (user_id, created_at desc);

create table if not exists public.user_rank_state (
  user_id text primary key references public.usuarios(id) on delete cascade,
  points_total int not null default 0,
  tier_id smallint references public.tiers(id),
  updated_at timestamptz not null default now()
);

create or replace function public.update_user_rank_state_from_ledger()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  total_points int;
  tier_smallint smallint;
begin
  insert into public.user_rank_state (user_id, points_total, tier_id, updated_at)
  values (new.user_id, new.points, null, now())
  on conflict (user_id) do update
    set points_total = public.user_rank_state.points_total + new.points,
        updated_at = now()
  returning points_total into total_points;

  select t.id
    into tier_smallint
    from public.tiers t
    where t.min_points <= total_points
      and (t.max_points is null or t.max_points >= total_points)
    order by t.min_points desc
    limit 1;

  update public.user_rank_state
    set tier_id = tier_smallint,
        updated_at = now()
    where user_id = new.user_id;

  return new;
end;
$$;

drop trigger if exists trg_points_ledger_update_rank on public.points_ledger;
create trigger trg_points_ledger_update_rank
after insert on public.points_ledger
for each row execute function public.update_user_rank_state_from_ledger();

alter table public.points_ledger enable row level security;
alter table public.user_rank_state enable row level security;

drop policy if exists points_ledger_select_owner on public.points_ledger;
create policy points_ledger_select_owner on public.points_ledger
  for select to authenticated
  using (
    exists (
      select 1 from public.usuarios u
      where u.id = points_ledger.user_id
        and u.id_auth = auth.uid()
    )
  );

drop policy if exists user_rank_state_select_owner on public.user_rank_state;
create policy user_rank_state_select_owner on public.user_rank_state
  for select to authenticated
  using (
    exists (
      select 1 from public.usuarios u
      where u.id = user_rank_state.user_id
        and u.id_auth = auth.uid()
    )
  );

-- ----------------------------
-- Grupos y canjes por grupo
-- ----------------------------
create table if not exists public.grupos (
  id uuid primary key default gen_random_uuid(),
  public_id text not null,
  referrer_id text references public.usuarios(id) on delete set null,
  negocio_id text references public.negocios(id) on delete cascade,
  promo_id text references public.promos(id) on delete set null,
  created_at timestamptz not null default now(),
  expires_at timestamptz
);

create table if not exists public.miembros (
  grupo_id uuid not null references public.grupos(id) on delete cascade,
  cliente_id text not null references public.usuarios(id) on delete cascade,
  joined_at timestamptz not null default now(),
  constraint miembros_grupo_cliente_unique unique (grupo_id, cliente_id)
);

create table if not exists public.grupo_canjeos (
  id uuid primary key default gen_random_uuid(),
  grupo_id uuid not null references public.grupos(id) on delete cascade,
  cliente_id text not null references public.usuarios(id) on delete cascade,
  qr_valido_id uuid not null references public.qr_validos(id) on delete cascade,
  redeemed_at timestamptz not null default now(),
  constraint grupo_canjeos_grupo_cliente_unique unique (grupo_id, cliente_id),
  constraint grupo_canjeos_qr_valido_unique unique (qr_valido_id)
);

-- ----------------------------
-- Referrals (relacion estable)
-- ----------------------------
create table if not exists public.referrals (
  id uuid primary key default gen_random_uuid(),
  referrer_id text not null references public.usuarios(id) on delete cascade,
  referred_id text not null references public.usuarios(id) on delete cascade,
  created_at timestamptz not null default now(),
  constraint referrals_unique unique (referrer_id, referred_id)
);

-- ----------------------------
-- Promos: flags para grupos
-- ----------------------------
alter table public.promos
  add column if not exists tipo text not null default 'individual',
  add column if not exists min_personas int,
  add column if not exists tier_minimo smallint references public.tiers(id),
  add column if not exists upgrade_rules jsonb,
  add column if not exists public_id text;

alter table public.usuarios
  add column if not exists public_id text;

create unique index if not exists idx_grupos_public_id on public.grupos (public_id);
create unique index if not exists idx_promos_public_id on public.promos (public_id);
create unique index if not exists idx_usuarios_public_id on public.usuarios (public_id);

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'promos_tipo_check'
  ) then
    alter table public.promos
      add constraint promos_tipo_check
      check (tipo in ('individual', 'grupo'));
  end if;
end$$;

-- ----------------------------
-- QR validos: enlace a grupo
-- ----------------------------
alter table public.qr_validos
  add column if not exists grupo_id uuid references public.grupos(id) on delete set null;

create index if not exists idx_qr_validos_grupo_id on public.qr_validos (grupo_id);

-- ----------------------------
-- Escaneos: unico por QR y sin insert del cliente
-- ----------------------------
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'escaneos_qrvalidoid_unique'
  ) then
    alter table public.escaneos
      add constraint escaneos_qrvalidoid_unique unique (qrvalidoid);
  end if;
end$$;

drop policy if exists escaneos_insert_by_client on public.escaneos;

-- ----------------------------
-- Public IDs
-- ----------------------------
create or replace function public.generate_public_id_suffix()
returns text
language sql
volatile
as $$
  select substr(
    upper(translate(encode(gen_random_bytes(6), 'base64'), '+/=', 'ABC')),
    1,
    6
  );
$$;

create or replace function public.set_public_id()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  candidate text;
  exists_id boolean;
  prefix text;
begin
  prefix := coalesce(TG_ARGV[0], '');
  if new.public_id is not null then
    return new;
  end if;

  loop
    candidate := prefix || '-' || public.generate_public_id_suffix();
    execute format(
      'select exists(select 1 from %I.%I where public_id = $1)',
      TG_TABLE_SCHEMA,
      TG_TABLE_NAME
    )
    into exists_id
    using candidate;
    if not exists_id then
      new.public_id := candidate;
      exit;
    end if;
  end loop;

  return new;
end;
$$;

update public.usuarios
  set public_id = 'USR-' || public.generate_public_id_suffix()
  where public_id is null;

update public.promos
  set public_id = 'PRM-' || public.generate_public_id_suffix()
  where public_id is null;

alter table public.usuarios
  alter column public_id set not null;

alter table public.promos
  alter column public_id set not null;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'usuarios_public_id_unique'
  ) then
    alter table public.usuarios
      add constraint usuarios_public_id_unique unique (public_id);
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'promos_public_id_unique'
  ) then
    alter table public.promos
      add constraint promos_public_id_unique unique (public_id);
  end if;
end$$;

drop trigger if exists trg_usuarios_public_id on public.usuarios;
create trigger trg_usuarios_public_id
before insert on public.usuarios
for each row execute function public.set_public_id('USR');

drop trigger if exists trg_promos_public_id on public.promos;
create trigger trg_promos_public_id
before insert on public.promos
for each row execute function public.set_public_id('PRM');

drop trigger if exists trg_grupos_public_id on public.grupos;
create trigger trg_grupos_public_id
before insert on public.grupos
for each row execute function public.set_public_id('GRP');

-- ----------------------------
-- RPC: generar QR valido con grupo opcional
-- ----------------------------
drop function if exists public.generate_valid_qr(text, boolean);
create or replace function public.generate_valid_qr(
  p_promo_id text,
  p_force boolean default false,
  p_grupo_id uuid default null
)
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
  grp public.grupos;
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

  if p_grupo_id is not null then
    select * into grp from public.grupos g where g.id = p_grupo_id;
    if grp.id is null then
      raise exception 'grupo_not_found';
    end if;

    if grp.expires_at is not null and grp.expires_at < now() then
      raise exception 'grupo_expired';
    end if;

    if grp.promo_id is not null and grp.promo_id <> p_promo_id then
      raise exception 'grupo_promo_mismatch';
    end if;

    if grp.negocio_id is not null and grp.negocio_id <> negocio then
      raise exception 'grupo_negocio_mismatch';
    end if;

    if not exists (
      select 1 from public.miembros m
      where m.grupo_id = p_grupo_id
        and m.cliente_id = cliente
    ) then
      raise exception 'not_group_member';
    end if;
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
    signature,
    grupo_id
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
    sig,
    p_grupo_id
  )
  returning * into result;

  return result;
end;
$$;

-- ----------------------------
-- RPC: canje + escaneos + grupos + puntos
-- ----------------------------
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
  was_redeemed boolean := false;
  grp public.grupos;
  grupo_canjeo_id uuid;
  referral_id uuid;
  base_points int;
  plus_points int;
  newref_points int;
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

    was_redeemed := true;
  end if;

  if was_redeemed then
    insert into public.escaneos (qrvalidoid, clienteid, fechacreacion)
    values (qr.id, qr.cliente_id, now())
    on conflict (qrvalidoid) do nothing;

    select pr.points into base_points
      from public.points_rules pr
      where pr.event_type = 'redeem_base'
      limit 1;

    if base_points is null then
      raise exception 'points_rule_missing:redeem_base';
    end if;

    insert into public.points_ledger (
      user_id, points, event_type, source, source_id, idempotency_key, meta
    ) values (
      qr.cliente_id,
      base_points,
      'redeem_base',
      'qr_validos',
      qr.id::text,
      'base:' || qr.id::text,
      jsonb_build_object(
        'negocio_id', qr.negocio_id,
        'promo_id', qr.promo_id,
        'qr_id', qr.id::text
      )
    )
    on conflict (idempotency_key) do nothing;

    if qr.grupo_id is not null then
      select * into grp from public.grupos g where g.id = qr.grupo_id;

      if grp.id is not null and grp.expires_at is not null and grp.expires_at < now() then
        raise exception 'grupo_expired';
      end if;

      if grp.id is not null and grp.referrer_id is not null and grp.referrer_id <> qr.cliente_id then
        insert into public.grupo_canjeos (grupo_id, cliente_id, qr_valido_id, redeemed_at)
        values (qr.grupo_id, qr.cliente_id, qr.id, now())
        on conflict do nothing
        returning id into grupo_canjeo_id;

        if grupo_canjeo_id is not null then
          select pr.points into plus_points
            from public.points_rules pr
            where pr.event_type = 'group_plus_one'
            limit 1;

          if plus_points is not null then
            insert into public.points_ledger (
              user_id, points, event_type, source, source_id, idempotency_key, meta
            ) values (
              grp.referrer_id,
              plus_points,
              'group_plus_one',
              'grupo_canjeos',
              grupo_canjeo_id::text,
              'gplus:' || qr.grupo_id::text || ':' || qr.cliente_id,
              jsonb_build_object(
                'grupo_id', qr.grupo_id::text,
                'cliente_id', qr.cliente_id,
                'qr_id', qr.id::text
              )
            )
            on conflict (idempotency_key) do nothing;
          end if;

          insert into public.referrals (referrer_id, referred_id)
          values (grp.referrer_id, qr.cliente_id)
          on conflict do nothing
          returning id into referral_id;

          if referral_id is not null then
            select pr.points into newref_points
              from public.points_rules pr
              where pr.event_type = 'new_referral_bonus'
              limit 1;

            if newref_points is not null then
              insert into public.points_ledger (
                user_id, points, event_type, source, source_id, idempotency_key, meta
              ) values (
                grp.referrer_id,
                newref_points,
                'new_referral_bonus',
                'referrals',
                referral_id::text,
                'newref:' || grp.referrer_id || ':' || qr.cliente_id,
                jsonb_build_object(
                  'referrer_id', grp.referrer_id,
                  'referred_id', qr.cliente_id,
                  'grupo_id', qr.grupo_id::text
                )
              )
              on conflict (idempotency_key) do nothing;
            end if;
          end if;
        end if;
      end if;
    end if;
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

comment on function public.generate_valid_qr is 'Genera un QR dinamico qrv-* (30m) con grupo opcional.';
comment on function public.redeem_valid_qr is 'Canje de QR por negocio con escaneos, grupos y puntos (ledger).';

-- ----------------------------
-- Direcciones: status + draft unico por usuario
-- ----------------------------
alter table public.direcciones
  add column if not exists status text not null default 'draft';

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'direcciones_status_check'
  ) then
    alter table public.direcciones
      add constraint direcciones_status_check
      check (status in ('draft', 'active'));
  end if;
end$$;

create unique index if not exists direcciones_one_draft_per_owner
  on public.direcciones(owner_id)
  where status = 'draft';

-- ----------------------------
-- RLS: grupos, miembros, grupo_canjeos, referrals
-- ----------------------------
alter table public.grupos enable row level security;
alter table public.miembros enable row level security;
alter table public.grupo_canjeos enable row level security;
alter table public.referrals enable row level security;

drop policy if exists grupos_select_member_or_referrer on public.grupos;
create policy grupos_select_member_or_referrer on public.grupos
  for select to authenticated
  using (
    exists (
      select 1 from public.miembros m
      join public.usuarios u on u.id = m.cliente_id
      where m.grupo_id = grupos.id
        and u.id_auth = auth.uid()
    )
    or exists (
      select 1 from public.usuarios u
      where u.id = grupos.referrer_id
        and u.id_auth = auth.uid()
    )
    or exists (
      select 1 from public.usuarios u
      where u.id_auth = auth.uid()
        and u.role = 'admin'
    )
  );

drop policy if exists grupos_insert_referrer on public.grupos;
create policy grupos_insert_referrer on public.grupos
  for insert to authenticated
  with check (
    exists (
      select 1 from public.usuarios u
      where u.id = grupos.referrer_id
        and u.id_auth = auth.uid()
    )
  );

drop policy if exists grupos_update_referrer on public.grupos;
create policy grupos_update_referrer on public.grupos
  for update to authenticated
  using (
    exists (
      select 1 from public.usuarios u
      where u.id = grupos.referrer_id
        and u.id_auth = auth.uid()
    )
    or exists (
      select 1 from public.usuarios u
      where u.id_auth = auth.uid()
        and u.role = 'admin'
    )
  )
  with check (
    exists (
      select 1 from public.usuarios u
      where u.id = grupos.referrer_id
        and u.id_auth = auth.uid()
    )
    or exists (
      select 1 from public.usuarios u
      where u.id_auth = auth.uid()
        and u.role = 'admin'
    )
  );

drop policy if exists grupos_delete_referrer on public.grupos;
create policy grupos_delete_referrer on public.grupos
  for delete to authenticated
  using (
    exists (
      select 1 from public.usuarios u
      where u.id = grupos.referrer_id
        and u.id_auth = auth.uid()
    )
    or exists (
      select 1 from public.usuarios u
      where u.id_auth = auth.uid()
        and u.role = 'admin'
    )
  );

drop policy if exists miembros_select_member_or_referrer on public.miembros;
create policy miembros_select_member_or_referrer on public.miembros
  for select to authenticated
  using (
    exists (
      select 1 from public.usuarios u
      where u.id = miembros.cliente_id
        and u.id_auth = auth.uid()
    )
    or exists (
      select 1 from public.grupos g
      join public.usuarios u on u.id = g.referrer_id
      where g.id = miembros.grupo_id
        and u.id_auth = auth.uid()
    )
    or exists (
      select 1 from public.usuarios u
      where u.id_auth = auth.uid()
        and u.role = 'admin'
    )
  );

drop policy if exists miembros_insert_self on public.miembros;
create policy miembros_insert_self on public.miembros
  for insert to authenticated
  with check (
    exists (
      select 1 from public.usuarios u
      where u.id = miembros.cliente_id
        and u.id_auth = auth.uid()
    )
    and exists (
      select 1 from public.grupos g
      where g.id = miembros.grupo_id
        and (g.expires_at is null or g.expires_at > now())
    )
  );

drop policy if exists miembros_delete_self_or_referrer on public.miembros;
create policy miembros_delete_self_or_referrer on public.miembros
  for delete to authenticated
  using (
    exists (
      select 1 from public.usuarios u
      where u.id = miembros.cliente_id
        and u.id_auth = auth.uid()
    )
    or exists (
      select 1 from public.grupos g
      join public.usuarios u on u.id = g.referrer_id
      where g.id = miembros.grupo_id
        and u.id_auth = auth.uid()
    )
    or exists (
      select 1 from public.usuarios u
      where u.id_auth = auth.uid()
        and u.role = 'admin'
    )
  );

drop policy if exists grupo_canjeos_select_member_or_referrer on public.grupo_canjeos;
create policy grupo_canjeos_select_member_or_referrer on public.grupo_canjeos
  for select to authenticated
  using (
    exists (
      select 1 from public.miembros m
      join public.usuarios u on u.id = m.cliente_id
      where m.grupo_id = grupo_canjeos.grupo_id
        and u.id_auth = auth.uid()
    )
    or exists (
      select 1 from public.grupos g
      join public.usuarios u on u.id = g.referrer_id
      where g.id = grupo_canjeos.grupo_id
        and u.id_auth = auth.uid()
    )
    or exists (
      select 1 from public.usuarios u
      where u.id_auth = auth.uid()
        and u.role = 'admin'
    )
  );

drop policy if exists referrals_select_referrer_or_referred on public.referrals;
create policy referrals_select_referrer_or_referred on public.referrals
  for select to authenticated
  using (
    exists (
      select 1 from public.usuarios u
      where u.id = referrals.referrer_id
        and u.id_auth = auth.uid()
    )
    or exists (
      select 1 from public.usuarios u
      where u.id = referrals.referred_id
        and u.id_auth = auth.uid()
    )
    or exists (
      select 1 from public.usuarios u
      where u.id_auth = auth.uid()
        and u.role = 'admin'
    )
  );
