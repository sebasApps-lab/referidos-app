-- 20260215_000009_support_anonymous_unified.sql
-- Unifica soporte anonimo y registrado sobre support_threads.

begin;

create extension if not exists "pgcrypto" with schema extensions;

do $$
begin
  begin
    alter type public.support_event_type add value 'linked_to_user';
  exception
    when duplicate_object then null;
  end;
end $$;

create table if not exists public.anon_support_profiles (
  id uuid primary key default gen_random_uuid(),
  public_id text not null unique,
  contact_channel text not null,
  contact_value text not null,
  display_name text,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  constraint anon_support_profiles_channel_check
    check (contact_channel in ('whatsapp', 'email'))
);

create unique index if not exists anon_support_profiles_contact_unique
  on public.anon_support_profiles (contact_channel, contact_value);

create index if not exists idx_anon_support_profiles_last_seen_at
  on public.anon_support_profiles (last_seen_at desc);

create or replace function public.generate_anon_support_public_id()
returns text
language sql
volatile
as $$
  select 'ANON-' || substr(upper(encode(extensions.gen_random_bytes(6), 'hex')), 1, 6);
$$;

create or replace function public.set_anon_support_profile_public_id()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  candidate text;
  exists_id boolean;
begin
  if new.public_id is not null then
    return new;
  end if;

  loop
    candidate := public.generate_anon_support_public_id();
    select exists(
      select 1 from public.anon_support_profiles p
      where p.public_id = candidate
    ) into exists_id;
    if not exists_id then
      new.public_id := candidate;
      exit;
    end if;
  end loop;

  return new;
end;
$$;

drop trigger if exists trg_anon_support_profiles_public_id on public.anon_support_profiles;
create trigger trg_anon_support_profiles_public_id
before insert on public.anon_support_profiles
for each row execute function public.set_anon_support_profile_public_id();

alter table public.support_threads
  add column if not exists request_origin text,
  add column if not exists anon_profile_id uuid,
  add column if not exists origin_source text,
  add column if not exists anon_tracking_token_hash text,
  add column if not exists is_anonymous boolean;

alter table public.support_threads
  alter column request_origin set default 'registered',
  alter column origin_source set default 'app',
  alter column is_anonymous set default false;

update public.support_threads
set request_origin = 'registered'
where request_origin is null;

update public.support_threads
set origin_source = 'app'
where origin_source is null;

update public.support_threads
set is_anonymous = (request_origin = 'anonymous')
where is_anonymous is null
   or is_anonymous <> (request_origin = 'anonymous');

alter table public.support_threads
  alter column request_origin set not null,
  alter column origin_source set not null,
  alter column is_anonymous set not null;

alter table public.support_threads
  alter column user_id drop not null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'support_threads_anon_profile_id_fkey'
  ) then
    alter table public.support_threads
      add constraint support_threads_anon_profile_id_fkey
      foreign key (anon_profile_id)
      references public.anon_support_profiles(id)
      on delete set null;
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'support_threads_request_origin_check'
  ) then
    alter table public.support_threads
      add constraint support_threads_request_origin_check
      check (request_origin in ('registered', 'anonymous'));
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'support_threads_identity_check'
  ) then
    alter table public.support_threads
      add constraint support_threads_identity_check
      check (
        (
          request_origin = 'registered'
          and user_id is not null
          and is_anonymous = false
        )
        or
        (
          request_origin = 'anonymous'
          and user_id is null
          and anon_profile_id is not null
          and is_anonymous = true
        )
      );
  end if;
end $$;

create unique index if not exists support_threads_client_request_anonymous_unique
  on public.support_threads (anon_profile_id, client_request_id)
  where request_origin = 'anonymous'
    and anon_profile_id is not null
    and client_request_id is not null;

create unique index if not exists support_threads_one_active_per_anon_profile
  on public.support_threads (anon_profile_id)
  where anon_profile_id is not null
    and status in ('new', 'assigned', 'in_progress', 'waiting_user', 'queued');

create or replace function public.mask_support_contact(
  p_channel text,
  p_value text
)
returns text
language plpgsql
immutable
as $$
declare
  local_part text;
  domain_part text;
  digits text;
begin
  if p_value is null or p_value = '' then
    return null;
  end if;

  if p_channel = 'email' then
    local_part := split_part(p_value, '@', 1);
    domain_part := split_part(p_value, '@', 2);
    if domain_part = '' then
      return p_value;
    end if;
    if length(local_part) <= 2 then
      return repeat('*', greatest(length(local_part), 1)) || '@' || domain_part;
    end if;
    return left(local_part, 1) || repeat('*', greatest(length(local_part) - 2, 1)) || right(local_part, 1) || '@' || domain_part;
  end if;

  digits := regexp_replace(p_value, '\D', '', 'g');
  if length(digits) <= 4 then
    return digits;
  end if;
  return repeat('*', greatest(length(digits) - 4, 1)) || right(digits, 4);
end;
$$;

create or replace view public.support_threads_public
as
select
  public_id,
  user_public_id,
  category,
  severity,
  status,
  summary,
  assigned_agent_phone,
  wa_message_text,
  wa_link,
  resolution,
  created_at,
  closed_at,
  request_origin,
  origin_source
from public.support_threads;

do $$
begin
  execute 'alter view public.support_threads_public set (security_invoker = true)';
exception
  when others then
    null;
end $$;

create or replace view public.support_threads_inbox
as
select
  t.public_id,
  t.category,
  t.severity,
  t.status,
  t.summary,
  t.created_at,
  t.updated_at,
  t.assigned_agent_id,
  t.created_by_agent_id,
  t.assigned_agent_phone,
  t.user_public_id,
  t.request_origin,
  t.origin_source,
  t.is_anonymous,
  t.personal_queue,
  t.anon_profile_id,
  a.public_id as anon_public_id,
  a.display_name as anon_display_name,
  a.contact_channel as anon_contact_channel,
  public.mask_support_contact(a.contact_channel, a.contact_value) as contact_display,
  case
    when t.request_origin = 'anonymous' then array['anonymous', t.category::text, t.severity::text]
    else array['registered', t.category::text, t.severity::text]
  end as routing_tags
from public.support_threads t
left join public.anon_support_profiles a on a.id = t.anon_profile_id;

do $$
begin
  execute 'alter view public.support_threads_inbox set (security_invoker = true)';
exception
  when others then
    null;
end $$;

grant select on public.support_threads_inbox to authenticated;
grant select on public.support_threads_public to authenticated;

alter table public.anon_support_profiles enable row level security;

drop policy if exists anon_support_profiles_select_support_admin on public.anon_support_profiles;
create policy anon_support_profiles_select_support_admin
on public.anon_support_profiles
for select
to authenticated
using (public.is_support() or public.is_admin());

drop policy if exists anon_support_profiles_admin_write on public.anon_support_profiles;
create policy anon_support_profiles_admin_write
on public.anon_support_profiles
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

commit;
