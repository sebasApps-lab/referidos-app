-- 20260216_000010_prelaunch_analytics_antifraud.sql
-- Prelaunch analytics + antifraude baseline (sin captcha), reusable for package-based clients.

begin;

create extension if not exists "pgcrypto" with schema extensions;

do $$
begin
  begin
    alter type public.support_category add value 'borrar_correo_waitlist';
  exception
    when duplicate_object then null;
  end;
end $$;

create table if not exists public.prelaunch_visitors (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  app_channel text not null default 'prelaunch_web',
  anon_id uuid not null,
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  visit_count integer not null default 1,
  ua_hash text,
  ua_family text,
  os_family text,
  ip_risk_id text,
  country text,
  city text,
  last_utm_source text,
  last_utm_campaign text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint prelaunch_visitors_app_channel_not_empty check (length(trim(app_channel)) > 0)
);

create unique index if not exists prelaunch_visitors_tenant_channel_anon_unique
  on public.prelaunch_visitors (tenant_id, app_channel, anon_id);

create index if not exists idx_prelaunch_visitors_tenant_last_seen
  on public.prelaunch_visitors (tenant_id, last_seen_at desc);

create index if not exists idx_prelaunch_visitors_tenant_ip_risk
  on public.prelaunch_visitors (tenant_id, ip_risk_id, last_seen_at desc);

create table if not exists public.prelaunch_events (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  app_channel text not null default 'prelaunch_web',
  anon_id uuid not null,
  visit_session_id uuid,
  event_type text not null,
  event_at timestamptz not null default now(),
  path text,
  props jsonb not null default '{}'::jsonb,
  ua_hash text,
  ua_family text,
  os_family text,
  ip_risk_id text,
  created_at timestamptz not null default now(),
  constraint prelaunch_events_event_type_not_empty check (length(trim(event_type)) > 0),
  constraint prelaunch_events_app_channel_not_empty check (length(trim(app_channel)) > 0)
);

create index if not exists idx_prelaunch_events_tenant_type_at
  on public.prelaunch_events (tenant_id, event_type, event_at desc);

create index if not exists idx_prelaunch_events_tenant_anon_at
  on public.prelaunch_events (tenant_id, anon_id, event_at desc);

create index if not exists idx_prelaunch_events_tenant_session_at
  on public.prelaunch_events (tenant_id, visit_session_id, event_at desc);

create index if not exists idx_prelaunch_events_tenant_ip_risk_at
  on public.prelaunch_events (tenant_id, ip_risk_id, event_at desc);

create index if not exists idx_prelaunch_events_tenant_path_at
  on public.prelaunch_events (tenant_id, path, event_at desc);

alter table public.prelaunch_visitors enable row level security;
alter table public.prelaunch_events enable row level security;

drop policy if exists prelaunch_visitors_select_support_admin on public.prelaunch_visitors;
create policy prelaunch_visitors_select_support_admin
  on public.prelaunch_visitors
  for select to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and (public.is_admin() or public.is_support())
  );

drop policy if exists prelaunch_events_select_support_admin on public.prelaunch_events;
create policy prelaunch_events_select_support_admin
  on public.prelaunch_events
  for select to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and (public.is_admin() or public.is_support())
  );

alter table public.waitlist_signups
  add column if not exists tenant_id uuid references public.tenants(id) on delete cascade,
  add column if not exists app_channel text default 'prelaunch_web',
  add column if not exists anon_id uuid,
  add column if not exists visit_session_id uuid,
  add column if not exists email_hash text,
  add column if not exists role_intent text default 'cliente',
  add column if not exists status text default 'active',
  add column if not exists confirmed_at timestamptz,
  add column if not exists utm jsonb default '{}'::jsonb,
  add column if not exists risk_flags jsonb default '{}'::jsonb,
  add column if not exists ua_hash text,
  add column if not exists ip_risk_id text;

update public.waitlist_signups w
set tenant_id = t.id
from public.tenants t
where t.name = 'ReferidosAPP'
  and w.tenant_id is null;

update public.waitlist_signups
set app_channel = 'prelaunch_web'
where app_channel is null or length(trim(app_channel)) = 0;

update public.waitlist_signups
set role_intent = case
  when role = 'negocio_interest' then 'negocio'
  else 'cliente'
end
where role_intent is null or length(trim(role_intent)) = 0;

update public.waitlist_signups
set status = 'active'
where status is null or length(trim(status)) = 0;

update public.waitlist_signups
set email_hash = encode(extensions.digest(convert_to(lower(trim(email)), 'UTF8'), 'sha256'), 'hex')
where email_hash is null and email is not null;

update public.waitlist_signups
set utm = '{}'::jsonb
where utm is null;

update public.waitlist_signups
set risk_flags = '{}'::jsonb
where risk_flags is null;

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'waitlist_signups'
      and column_name = 'tenant_id'
      and is_nullable = 'YES'
  ) then
    alter table public.waitlist_signups
      alter column tenant_id set not null;
  end if;
end $$;

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'waitlist_signups'
      and column_name = 'app_channel'
      and is_nullable = 'YES'
  ) then
    alter table public.waitlist_signups
      alter column app_channel set not null;
  end if;
end $$;

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'waitlist_signups'
      and column_name = 'role_intent'
      and is_nullable = 'YES'
  ) then
    alter table public.waitlist_signups
      alter column role_intent set not null;
  end if;
end $$;

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'waitlist_signups'
      and column_name = 'status'
      and is_nullable = 'YES'
  ) then
    alter table public.waitlist_signups
      alter column status set not null;
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'waitlist_signups_role_intent_check'
  ) then
    alter table public.waitlist_signups
      add constraint waitlist_signups_role_intent_check
      check (role_intent in ('cliente', 'negocio'));
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'waitlist_signups_status_check'
  ) then
    alter table public.waitlist_signups
      add constraint waitlist_signups_status_check
      check (status in ('pending_confirm', 'active', 'unsubscribed', 'blocked'));
  end if;
end $$;

create unique index if not exists waitlist_signups_tenant_email_hash_unique
  on public.waitlist_signups (tenant_id, email_hash)
  where email_hash is not null;

create index if not exists idx_waitlist_signups_tenant_created
  on public.waitlist_signups (tenant_id, created_at desc);

create index if not exists idx_waitlist_signups_tenant_status_created
  on public.waitlist_signups (tenant_id, status, created_at desc);

create index if not exists idx_waitlist_signups_tenant_ip_risk_created
  on public.waitlist_signups (tenant_id, ip_risk_id, created_at desc);

alter table public.waitlist_signups enable row level security;

drop policy if exists waitlist_signups_select_support_admin on public.waitlist_signups;
create policy waitlist_signups_select_support_admin
  on public.waitlist_signups
  for select to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and (public.is_admin() or public.is_support())
  );

alter table public.support_threads
  add column if not exists app_channel text default 'app',
  add column if not exists anon_id uuid,
  add column if not exists visit_session_id uuid,
  add column if not exists ua_hash text,
  add column if not exists ip_risk_id text;

update public.support_threads
set app_channel = case
  when request_origin = 'anonymous' and origin_source = 'prelaunch' then 'prelaunch_web'
  else 'app'
end
where app_channel is null or length(trim(app_channel)) = 0;

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'support_threads'
      and column_name = 'app_channel'
      and is_nullable = 'YES'
  ) then
    alter table public.support_threads
      alter column app_channel set not null;
  end if;
end $$;

create index if not exists idx_support_threads_anon_identity
  on public.support_threads (request_origin, anon_id, created_at desc)
  where request_origin = 'anonymous';

create index if not exists idx_support_threads_anon_ip_risk
  on public.support_threads (request_origin, ip_risk_id, created_at desc)
  where request_origin = 'anonymous';

create or replace function public.prelaunch_cleanup(
  p_tenant_id uuid default null,
  p_events_days integer default 90,
  p_visitors_days integer default 180,
  p_waitlist_days integer default 365
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  deleted_events bigint := 0;
  deleted_visitors bigint := 0;
  deleted_waitlist bigint := 0;
begin
  delete from public.prelaunch_events e
  where (p_tenant_id is null or e.tenant_id = p_tenant_id)
    and e.event_at < now() - make_interval(days => p_events_days);
  get diagnostics deleted_events = row_count;

  delete from public.prelaunch_visitors v
  where (p_tenant_id is null or v.tenant_id = p_tenant_id)
    and v.last_seen_at < now() - make_interval(days => p_visitors_days);
  get diagnostics deleted_visitors = row_count;

  delete from public.waitlist_signups w
  where (p_tenant_id is null or w.tenant_id = p_tenant_id)
    and w.status in ('unsubscribed', 'blocked')
    and w.created_at < now() - make_interval(days => p_waitlist_days);
  get diagnostics deleted_waitlist = row_count;

  return jsonb_build_object(
    'deleted_events', deleted_events,
    'deleted_visitors', deleted_visitors,
    'deleted_waitlist', deleted_waitlist
  );
end;
$$;

revoke all on function public.prelaunch_cleanup(uuid, integer, integer, integer) from public, anon, authenticated;
grant execute on function public.prelaunch_cleanup(uuid, integer, integer, integer) to service_role;

do $$
begin
  if exists (select 1 from pg_extension where extname = 'pg_cron') then
    perform cron.unschedule(j.jobid)
    from cron.job j
    where j.jobname = 'prelaunch_cleanup_daily';

    perform cron.schedule(
      'prelaunch_cleanup_daily',
      '35 3 * * *',
      'select public.prelaunch_cleanup(null, 90, 180, 365);'
    );
  end if;
exception
  when others then
    null;
end $$;

commit;
