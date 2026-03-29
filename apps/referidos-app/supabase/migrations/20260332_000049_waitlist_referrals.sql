-- 20260328_000049_waitlist_referrals.sql
-- Waitlist referral links and persistent attribution from waitlist to active usuarios.

begin;

create extension if not exists "pgcrypto" with schema extensions;

alter table public.waitlist_signups
  add column if not exists linked_usuario_id uuid references public.usuarios(id) on delete set null,
  add column if not exists linked_at timestamptz;

drop index if exists public.waitlist_signups_tenant_email_hash_unique;

create unique index if not exists waitlist_signups_tenant_email_hash_role_unique
  on public.waitlist_signups (tenant_id, email_hash, role_intent)
  where email_hash is not null;

create index if not exists idx_waitlist_signups_linked_usuario
  on public.waitlist_signups (linked_usuario_id)
  where linked_usuario_id is not null;

create index if not exists idx_waitlist_signups_tenant_role_created
  on public.waitlist_signups (tenant_id, role_intent, created_at desc);

create table if not exists public.waitlist_referral_codes (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  waitlist_signup_id uuid not null references public.waitlist_signups(id) on delete cascade,
  code text not null,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  constraint waitlist_referral_codes_waitlist_signup_unique unique (waitlist_signup_id),
  constraint waitlist_referral_codes_tenant_code_unique unique (tenant_id, code),
  constraint waitlist_referral_codes_status_check check (status in ('active', 'revoked')),
  constraint waitlist_referral_codes_code_not_empty check (length(trim(code)) >= 6)
);

create index if not exists idx_waitlist_referral_codes_tenant_created
  on public.waitlist_referral_codes (tenant_id, created_at desc);

create table if not exists public.waitlist_referrals (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  referrer_signup_id uuid not null references public.waitlist_signups(id) on delete cascade,
  referred_signup_id uuid not null references public.waitlist_signups(id) on delete cascade,
  referral_code_id uuid not null references public.waitlist_referral_codes(id) on delete restrict,
  status text not null default 'attributed',
  qualified_at timestamptz,
  rewarded_at timestamptz,
  reward_points_ledger_id uuid references public.points_ledger(id) on delete set null,
  created_at timestamptz not null default now(),
  constraint waitlist_referrals_referred_unique unique (referred_signup_id),
  constraint waitlist_referrals_referrer_referred_unique unique (referrer_signup_id, referred_signup_id),
  constraint waitlist_referrals_not_self check (referrer_signup_id <> referred_signup_id),
  constraint waitlist_referrals_status_check check (status in ('attributed', 'qualified', 'rewarded'))
);

create index if not exists idx_waitlist_referrals_referrer_status_created
  on public.waitlist_referrals (referrer_signup_id, status, created_at desc);

create index if not exists idx_waitlist_referrals_referred_status_created
  on public.waitlist_referrals (referred_signup_id, status, created_at desc);

create index if not exists idx_waitlist_referrals_tenant_status_created
  on public.waitlist_referrals (tenant_id, status, created_at desc);

insert into public.points_rules (event_type, points)
values ('waitlist_referral_bonus', 30)
on conflict (event_type) do update
  set points = excluded.points;

alter table public.waitlist_referral_codes enable row level security;
alter table public.waitlist_referrals enable row level security;

drop policy if exists waitlist_referral_codes_select_admin on public.waitlist_referral_codes;
create policy waitlist_referral_codes_select_admin
  on public.waitlist_referral_codes
  for select to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and public.is_admin()
  );

drop policy if exists waitlist_referrals_select_admin on public.waitlist_referrals;
create policy waitlist_referrals_select_admin
  on public.waitlist_referrals
  for select to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and public.is_admin()
  );

create or replace function public.random_waitlist_referral_code(p_length integer default 9)
returns text
language plpgsql
volatile
as $$
declare
  alphabet text := 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  safe_length integer := greatest(coalesce(p_length, 9), 6);
  raw_bytes bytea := extensions.gen_random_bytes(safe_length);
  result text := '';
  idx integer;
begin
  for i in 0..safe_length - 1 loop
    idx := get_byte(raw_bytes, i) % length(alphabet);
    result := result || substr(alphabet, idx + 1, 1);
  end loop;

  return result;
end;
$$;

create or replace function public.ensure_waitlist_referral_code(p_waitlist_signup_id uuid)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_signup record;
  v_existing text;
  v_code text;
begin
  select id, tenant_id
    into v_signup
    from public.waitlist_signups
   where id = p_waitlist_signup_id;

  if not found then
    raise exception 'waitlist_signup_not_found';
  end if;

  select code
    into v_existing
    from public.waitlist_referral_codes
   where waitlist_signup_id = v_signup.id
   limit 1;

  if v_existing is not null then
    return v_existing;
  end if;

  for i in 1..12 loop
    v_code := public.random_waitlist_referral_code(9);

    begin
      insert into public.waitlist_referral_codes (
        tenant_id,
        waitlist_signup_id,
        code,
        status
      ) values (
        v_signup.tenant_id,
        v_signup.id,
        v_code,
        'active'
      );

      return v_code;
    exception
      when unique_violation then
        null;
    end;
  end loop;

  raise exception 'waitlist_referral_code_generation_failed';
end;
$$;

create or replace function public.process_waitlist_referral(p_referral_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_ref record;
  v_bonus_points integer;
  v_reward_id uuid;
begin
  select
    r.id,
    r.status,
    r.reward_points_ledger_id,
    r.referrer_signup_id,
    r.referred_signup_id,
    ref_s.linked_usuario_id as referrer_user_id,
    referred_s.linked_usuario_id as referred_user_id
    into v_ref
    from public.waitlist_referrals r
    join public.waitlist_signups ref_s on ref_s.id = r.referrer_signup_id
    join public.waitlist_signups referred_s on referred_s.id = r.referred_signup_id
   where r.id = p_referral_id
   for update;

  if not found then
    return jsonb_build_object('ok', false, 'reason', 'referral_not_found');
  end if;

  if v_ref.referred_user_id is not null and v_ref.status = 'attributed' then
    update public.waitlist_referrals
       set status = 'qualified',
           qualified_at = coalesce(qualified_at, now())
     where id = v_ref.id;

    v_ref.status := 'qualified';
  end if;

  if v_ref.referred_user_id is null then
    return jsonb_build_object('ok', true, 'status', v_ref.status, 'rewarded', false);
  end if;

  if v_ref.referrer_user_id is null then
    return jsonb_build_object('ok', true, 'status', v_ref.status, 'rewarded', false);
  end if;

  if v_ref.referrer_user_id = v_ref.referred_user_id then
    return jsonb_build_object('ok', true, 'status', v_ref.status, 'rewarded', false, 'reason', 'self_referral');
  end if;

  if v_ref.reward_points_ledger_id is null then
    select pr.points
      into v_bonus_points
      from public.points_rules pr
     where pr.event_type = 'waitlist_referral_bonus'
     limit 1;

    if v_bonus_points is null then
      raise exception 'points_rule_missing:waitlist_referral_bonus';
    end if;

    insert into public.points_ledger (
      user_id,
      points,
      event_type,
      source,
      source_id,
      idempotency_key,
      meta
    ) values (
      v_ref.referrer_user_id,
      v_bonus_points,
      'waitlist_referral_bonus',
      'waitlist_referrals',
      v_ref.id::text,
      'waitlist_referral_bonus:' || v_ref.id::text,
      jsonb_build_object(
        'waitlist_referral_id', v_ref.id::text,
        'referrer_signup_id', v_ref.referrer_signup_id::text,
        'referred_signup_id', v_ref.referred_signup_id::text,
        'referred_user_id', v_ref.referred_user_id
      )
    )
    on conflict (idempotency_key) do nothing
    returning id into v_reward_id;

    if v_reward_id is null then
      select id
        into v_reward_id
        from public.points_ledger
       where idempotency_key = 'waitlist_referral_bonus:' || v_ref.id::text
       limit 1;
    end if;

    insert into public.referrals (referrer_id, referred_id)
    values (v_ref.referrer_user_id, v_ref.referred_user_id)
    on conflict do nothing;

    update public.waitlist_referrals
       set status = 'rewarded',
           qualified_at = coalesce(qualified_at, now()),
           rewarded_at = coalesce(rewarded_at, now()),
           reward_points_ledger_id = coalesce(reward_points_ledger_id, v_reward_id)
     where id = v_ref.id;

    return jsonb_build_object(
      'ok', true,
      'status', 'rewarded',
      'rewarded', true,
      'reward_points_ledger_id', v_reward_id
    );
  end if;

  insert into public.referrals (referrer_id, referred_id)
  values (v_ref.referrer_user_id, v_ref.referred_user_id)
  on conflict do nothing;

  update public.waitlist_referrals
     set status = 'rewarded',
         qualified_at = coalesce(qualified_at, now()),
         rewarded_at = coalesce(rewarded_at, now())
   where id = v_ref.id
     and status <> 'rewarded';

  return jsonb_build_object(
    'ok', true,
    'status', 'rewarded',
    'rewarded', true,
    'reward_points_ledger_id', v_ref.reward_points_ledger_id
  );
end;
$$;

create or replace function public.process_waitlist_referrals_for_signup(p_waitlist_signup_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_referral_id uuid;
  v_count integer := 0;
begin
  for v_referral_id in
    select id
      from public.waitlist_referrals
     where referrer_signup_id = p_waitlist_signup_id
        or referred_signup_id = p_waitlist_signup_id
  loop
    perform public.process_waitlist_referral(v_referral_id);
    v_count := v_count + 1;
  end loop;

  return jsonb_build_object('ok', true, 'processed', v_count);
end;
$$;

create or replace function public.attach_waitlist_referral(
  p_referred_signup_id uuid,
  p_referral_code text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_referred record;
  v_code record;
  v_existing record;
  v_referral_id uuid;
  v_normalized_code text := upper(trim(coalesce(p_referral_code, '')));
begin
  if v_normalized_code = '' then
    return jsonb_build_object('ok', true, 'applied', false, 'reason', 'missing_code');
  end if;

  select id, tenant_id, email_hash, role_intent
    into v_referred
    from public.waitlist_signups
   where id = p_referred_signup_id;

  if not found then
    return jsonb_build_object('ok', false, 'applied', false, 'reason', 'referred_not_found');
  end if;

  select
    c.id,
    c.waitlist_signup_id,
    c.tenant_id,
    ref_s.email_hash as referrer_email_hash,
    ref_s.role_intent as referrer_role_intent
    into v_code
    from public.waitlist_referral_codes c
    join public.waitlist_signups ref_s on ref_s.id = c.waitlist_signup_id
   where c.tenant_id = v_referred.tenant_id
     and c.code = v_normalized_code
     and c.status = 'active'
   limit 1;

  if not found then
    return jsonb_build_object('ok', true, 'applied', false, 'reason', 'invalid_code');
  end if;

  if v_code.waitlist_signup_id = v_referred.id then
    return jsonb_build_object('ok', true, 'applied', false, 'reason', 'self_referral');
  end if;

  if v_code.referrer_role_intent <> v_referred.role_intent then
    return jsonb_build_object('ok', true, 'applied', false, 'reason', 'role_mismatch');
  end if;

  if v_code.referrer_email_hash is not null
     and v_referred.email_hash is not null
     and v_code.referrer_email_hash = v_referred.email_hash then
    return jsonb_build_object('ok', true, 'applied', false, 'reason', 'self_referral');
  end if;

  select id, referrer_signup_id
    into v_existing
    from public.waitlist_referrals
   where referred_signup_id = v_referred.id
   limit 1;

  if found then
    return jsonb_build_object(
      'ok', true,
      'applied', false,
      'reason', 'already_attributed',
      'referral_id', v_existing.id
    );
  end if;

  insert into public.waitlist_referrals (
    tenant_id,
    referrer_signup_id,
    referred_signup_id,
    referral_code_id,
    status
  ) values (
    v_referred.tenant_id,
    v_code.waitlist_signup_id,
    v_referred.id,
    v_code.id,
    'attributed'
  )
  returning id into v_referral_id;

  perform public.process_waitlist_referral(v_referral_id);

  return jsonb_build_object(
    'ok', true,
    'applied', true,
    'reason', 'attributed',
    'referral_id', v_referral_id
  );
end;
$$;

create or replace function public.get_waitlist_referral_summary(p_waitlist_signup_id uuid)
returns jsonb
language sql
security definer
set search_path = public
as $$
  with code_row as (
    select c.code
      from public.waitlist_referral_codes c
     where c.waitlist_signup_id = p_waitlist_signup_id
     limit 1
  ),
  counts as (
    select
      count(*)::int as total_count,
      count(*) filter (where r.status = 'attributed')::int as attributed_count,
      count(*) filter (where r.status in ('qualified', 'rewarded'))::int as qualified_count,
      count(*) filter (where r.status = 'rewarded')::int as rewarded_count
      from public.waitlist_referrals r
     where r.referrer_signup_id = p_waitlist_signup_id
  )
  select jsonb_build_object(
    'code', (select code from code_row),
    'total_count', coalesce((select total_count from counts), 0),
    'attributed_count', coalesce((select attributed_count from counts), 0),
    'qualified_count', coalesce((select qualified_count from counts), 0),
    'rewarded_count', coalesce((select rewarded_count from counts), 0)
  );
$$;

create or replace function public.link_waitlist_signup_by_signup_id(p_waitlist_signup_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_signup record;
  v_usuario_id uuid;
begin
  select id, tenant_id, email_hash, role_intent, linked_usuario_id
    into v_signup
    from public.waitlist_signups
   where id = p_waitlist_signup_id;

  if not found then
    return jsonb_build_object('ok', false, 'linked', false, 'reason', 'waitlist_not_found');
  end if;

  if v_signup.linked_usuario_id is not null then
    perform public.process_waitlist_referrals_for_signup(v_signup.id);
    return jsonb_build_object(
      'ok', true,
      'linked', true,
      'waitlist_signup_id', v_signup.id,
      'usuario_id', v_signup.linked_usuario_id
    );
  end if;

  select u.id
    into v_usuario_id
    from public.usuarios u
   where u.tenant_id = v_signup.tenant_id
     and lower(trim(coalesce(u.email, ''))) <> ''
     and encode(extensions.digest(convert_to(lower(trim(u.email)), 'UTF8'), 'sha256'), 'hex') = v_signup.email_hash
     and case
           when lower(trim(coalesce(u.role, ''))) = 'negocio' then 'negocio'
           when lower(trim(coalesce(u.role, ''))) = 'cliente' then 'cliente'
           else null
         end = v_signup.role_intent
     and coalesce(lower(trim(u.account_status)), '') = 'active'
   order by u.id
   limit 1;

  if v_usuario_id is null then
    return jsonb_build_object('ok', true, 'linked', false, 'reason', 'usuario_not_found');
  end if;

  update public.waitlist_signups
     set linked_usuario_id = v_usuario_id,
         linked_at = coalesce(linked_at, now())
   where id = v_signup.id;

  perform public.process_waitlist_referrals_for_signup(v_signup.id);

  return jsonb_build_object(
    'ok', true,
    'linked', true,
    'waitlist_signup_id', v_signup.id,
    'usuario_id', v_usuario_id
  );
end;
$$;

create or replace function public.link_waitlist_signup_to_usuario(p_usuario_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_usuario record;
  v_email_hash text;
  v_role_intent text;
  v_signup record;
begin
  select id, tenant_id, email, role, account_status
    into v_usuario
    from public.usuarios
   where id = p_usuario_id;

  if not found then
    return jsonb_build_object('ok', false, 'linked', false, 'reason', 'usuario_not_found');
  end if;

  if coalesce(lower(trim(v_usuario.account_status)), '') <> 'active' then
    return jsonb_build_object('ok', true, 'linked', false, 'reason', 'usuario_not_active');
  end if;

  if lower(trim(coalesce(v_usuario.role, ''))) = 'negocio' then
    v_role_intent := 'negocio';
  elsif lower(trim(coalesce(v_usuario.role, ''))) = 'cliente' then
    v_role_intent := 'cliente';
  else
    return jsonb_build_object('ok', true, 'linked', false, 'reason', 'unsupported_role');
  end if;

  if v_usuario.tenant_id is null or trim(coalesce(v_usuario.email, '')) = '' then
    return jsonb_build_object('ok', true, 'linked', false, 'reason', 'missing_identity');
  end if;

  v_email_hash := encode(
    extensions.digest(convert_to(lower(trim(v_usuario.email)), 'UTF8'), 'sha256'),
    'hex'
  );

  select id, linked_usuario_id
    into v_signup
    from public.waitlist_signups
   where tenant_id = v_usuario.tenant_id
     and email_hash = v_email_hash
     and role_intent = v_role_intent
   order by created_at desc
   limit 1
   for update;

  if not found then
    return jsonb_build_object('ok', true, 'linked', false, 'reason', 'waitlist_not_found');
  end if;

  if v_signup.linked_usuario_id is not null and v_signup.linked_usuario_id <> v_usuario.id then
    return jsonb_build_object('ok', false, 'linked', false, 'reason', 'waitlist_already_linked');
  end if;

  update public.waitlist_signups
     set linked_usuario_id = v_usuario.id,
         linked_at = coalesce(linked_at, now())
   where id = v_signup.id;

  perform public.process_waitlist_referrals_for_signup(v_signup.id);

  return jsonb_build_object(
    'ok', true,
    'linked', true,
    'waitlist_signup_id', v_signup.id,
    'usuario_id', v_usuario.id
  );
end;
$$;

create or replace function public.trg_waitlist_signup_after_insert()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public.ensure_waitlist_referral_code(new.id);
  perform public.link_waitlist_signup_by_signup_id(new.id);
  return new;
end;
$$;

drop trigger if exists trg_waitlist_signup_after_insert on public.waitlist_signups;
create trigger trg_waitlist_signup_after_insert
after insert on public.waitlist_signups
for each row execute function public.trg_waitlist_signup_after_insert();

create or replace function public.trg_usuario_link_waitlist()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if coalesce(lower(trim(new.account_status)), '') = 'active' and (
    tg_op = 'INSERT'
    or old.account_status is distinct from new.account_status
    or old.email is distinct from new.email
    or old.role is distinct from new.role
    or old.tenant_id is distinct from new.tenant_id
  ) then
    perform public.link_waitlist_signup_to_usuario(new.id);
  end if;

  return new;
end;
$$;

drop trigger if exists trg_usuario_link_waitlist on public.usuarios;
create trigger trg_usuario_link_waitlist
after insert or update of email, role, account_status, tenant_id on public.usuarios
for each row execute function public.trg_usuario_link_waitlist();

do $$
declare
  v_signup_id uuid;
  v_usuario_id uuid;
begin
  for v_signup_id in
    select w.id
      from public.waitlist_signups w
     where not exists (
       select 1
         from public.waitlist_referral_codes c
        where c.waitlist_signup_id = w.id
     )
  loop
    perform public.ensure_waitlist_referral_code(v_signup_id);
  end loop;

  for v_usuario_id in
    select u.id
      from public.usuarios u
     where coalesce(lower(trim(u.account_status)), '') = 'active'
  loop
    perform public.link_waitlist_signup_to_usuario(v_usuario_id);
  end loop;
end $$;

revoke all on function public.ensure_waitlist_referral_code(uuid) from public, anon, authenticated;
revoke all on function public.attach_waitlist_referral(uuid, text) from public, anon, authenticated;
revoke all on function public.get_waitlist_referral_summary(uuid) from public, anon, authenticated;
revoke all on function public.link_waitlist_signup_by_signup_id(uuid) from public, anon, authenticated;
revoke all on function public.link_waitlist_signup_to_usuario(uuid) from public, anon, authenticated;
revoke all on function public.process_waitlist_referral(uuid) from public, anon, authenticated;
revoke all on function public.process_waitlist_referrals_for_signup(uuid) from public, anon, authenticated;

grant execute on function public.ensure_waitlist_referral_code(uuid) to service_role;
grant execute on function public.attach_waitlist_referral(uuid, text) to service_role;
grant execute on function public.get_waitlist_referral_summary(uuid) to service_role;
grant execute on function public.link_waitlist_signup_by_signup_id(uuid) to service_role;
grant execute on function public.link_waitlist_signup_to_usuario(uuid) to service_role;
grant execute on function public.process_waitlist_referral(uuid) to service_role;
grant execute on function public.process_waitlist_referrals_for_signup(uuid) to service_role;

commit;
