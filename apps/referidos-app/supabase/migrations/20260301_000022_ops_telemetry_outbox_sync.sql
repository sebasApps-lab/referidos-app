-- 20260301_000022_ops_telemetry_outbox_sync.sql
-- Runtime outbox + hot/cold sync dispatch orchestration to central ops telemetry.

begin;

create extension if not exists "pgcrypto" with schema extensions;

do $$
begin
  begin
    create extension if not exists pg_net;
  exception
    when others then
      null;
  end;

  begin
    create extension if not exists pg_cron;
  exception
    when others then
      null;
  end;
end;
$$;

create table if not exists public.ops_sync_outbox (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  domain text not null
    check (domain in ('observability', 'support', 'prelaunch_analytics', 'prelaunch_waitlist')),
  source_table text not null,
  source_row_id text not null,
  source_event_key text not null,
  source_app_id text not null default 'referidos-app',
  event_type text not null,
  occurred_at timestamptz not null default now(),
  retention_tier text not null default 'short'
    check (retention_tier in ('short', 'long')),
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'pending'
    check (status in ('pending', 'sending', 'sent', 'failed', 'dead')),
  attempts integer not null default 0 check (attempts >= 0),
  next_retry_at timestamptz not null default now(),
  last_attempt_at timestamptz,
  last_error text,
  sent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (source_event_key)
);

create index if not exists idx_ops_sync_outbox_status_retry
  on public.ops_sync_outbox (status, next_retry_at, created_at);

create index if not exists idx_ops_sync_outbox_tenant_domain_created
  on public.ops_sync_outbox (tenant_id, domain, created_at desc);

create index if not exists idx_ops_sync_outbox_occurred
  on public.ops_sync_outbox (occurred_at desc);

drop trigger if exists trg_ops_sync_outbox_touch_updated_at on public.ops_sync_outbox;
create trigger trg_ops_sync_outbox_touch_updated_at
before update on public.ops_sync_outbox
for each row execute function public.touch_updated_at();

create table if not exists public.ops_sync_runtime_config (
  tenant_id uuid primary key references public.tenants(id) on delete cascade,
  runtime_base_url text not null
    check (runtime_base_url ~* '^https://'),
  cron_token text not null check (length(trim(cron_token)) >= 24),
  enabled boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_ops_sync_runtime_config_touch_updated_at on public.ops_sync_runtime_config;
create trigger trg_ops_sync_runtime_config_touch_updated_at
before update on public.ops_sync_runtime_config
for each row execute function public.touch_updated_at();

create or replace function public.ops_sync_mask_email(p_email text)
returns text
language plpgsql
immutable
as $$
declare
  local_part text;
  domain_part text;
begin
  if p_email is null or length(trim(p_email)) = 0 then
    return null;
  end if;

  local_part := split_part(trim(p_email), '@', 1);
  domain_part := split_part(trim(p_email), '@', 2);

  if domain_part = '' then
    return '***';
  end if;

  if length(local_part) <= 2 then
    return repeat('*', greatest(length(local_part), 1)) || '@' || domain_part;
  end if;

  return left(local_part, 1)
    || repeat('*', greatest(length(local_part) - 2, 1))
    || right(local_part, 1)
    || '@'
    || domain_part;
end;
$$;

create or replace function public.ops_sync_default_tenant_id()
returns uuid
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_tenant_id uuid;
begin
  select t.id
    into v_tenant_id
  from public.tenants t
  where lower(t.name) = 'referidosapp'
  order by t.created_at asc
  limit 1;

  if v_tenant_id is null then
    select t.id
      into v_tenant_id
    from public.tenants t
    order by t.created_at asc
    limit 1;
  end if;

  return v_tenant_id;
end;
$$;

create or replace function public.ops_sync_enqueue(
  p_tenant_id uuid,
  p_domain text,
  p_source_table text,
  p_source_row_id text,
  p_source_event_key text,
  p_source_app_id text,
  p_event_type text,
  p_occurred_at timestamptz,
  p_retention_tier text,
  p_payload jsonb default '{}'::jsonb
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_tenant_id is null then
    return;
  end if;

  if length(trim(coalesce(p_source_event_key, ''))) = 0 then
    return;
  end if;

  insert into public.ops_sync_outbox (
    tenant_id,
    domain,
    source_table,
    source_row_id,
    source_event_key,
    source_app_id,
    event_type,
    occurred_at,
    retention_tier,
    payload,
    status,
    next_retry_at
  )
  values (
    p_tenant_id,
    p_domain,
    p_source_table,
    p_source_row_id,
    p_source_event_key,
    coalesce(nullif(trim(p_source_app_id), ''), 'referidos-app'),
    coalesce(nullif(trim(p_event_type), ''), 'event'),
    coalesce(p_occurred_at, now()),
    case when p_retention_tier = 'long' then 'long' else 'short' end,
    coalesce(p_payload, '{}'::jsonb),
    'pending',
    now()
  )
  on conflict (source_event_key) do nothing;
end;
$$;

create or replace function public.ops_sync_claim_outbox(p_limit integer default 200)
returns setof public.ops_sync_outbox
language plpgsql
security definer
set search_path = public
as $$
declare
  v_limit integer;
begin
  v_limit := greatest(1, least(coalesce(p_limit, 200), 1000));

  update public.ops_sync_outbox
  set
    status = 'failed',
    next_retry_at = now(),
    last_error = coalesce(last_error, 'stale_sending_reset'),
    updated_at = now()
  where status = 'sending'
    and last_attempt_at is not null
    and last_attempt_at < now() - interval '20 minutes';

  return query
  with target as (
    select o.id
    from public.ops_sync_outbox o
    where o.status in ('pending', 'failed')
      and o.next_retry_at <= now()
    order by o.created_at asc
    limit v_limit
    for update skip locked
  ),
  claimed as (
    update public.ops_sync_outbox o
    set
      status = 'sending',
      attempts = o.attempts + 1,
      last_attempt_at = now(),
      updated_at = now()
    from target t
    where o.id = t.id
    returning o.*
  )
  select * from claimed;
end;
$$;

create or replace function public.ops_sync_cleanup(
  p_observability_sent_days integer default 7,
  p_support_sent_days integer default 30,
  p_prelaunch_analytics_sent_days integer default 14,
  p_prelaunch_waitlist_sent_days integer default 45,
  p_failed_days integer default 30,
  p_dead_days integer default 45
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_obs_sent integer := 0;
  v_support_sent integer := 0;
  v_analytics_sent integer := 0;
  v_waitlist_sent integer := 0;
  v_failed integer := 0;
  v_dead integer := 0;
begin
  with deleted as (
    delete from public.ops_sync_outbox o
    where o.status = 'sent'
      and (
        (o.domain = 'observability' and coalesce(o.sent_at, o.created_at) < now() - make_interval(days => greatest(1, coalesce(p_observability_sent_days, 7))))
        or (o.domain = 'support' and coalesce(o.sent_at, o.created_at) < now() - make_interval(days => greatest(1, coalesce(p_support_sent_days, 30))))
        or (o.domain = 'prelaunch_analytics' and coalesce(o.sent_at, o.created_at) < now() - make_interval(days => greatest(1, coalesce(p_prelaunch_analytics_sent_days, 14))))
        or (o.domain = 'prelaunch_waitlist' and coalesce(o.sent_at, o.created_at) < now() - make_interval(days => greatest(1, coalesce(p_prelaunch_waitlist_sent_days, 45))))
      )
    returning domain
  )
  select
    count(*) filter (where domain = 'observability')::integer,
    count(*) filter (where domain = 'support')::integer,
    count(*) filter (where domain = 'prelaunch_analytics')::integer,
    count(*) filter (where domain = 'prelaunch_waitlist')::integer
  into v_obs_sent, v_support_sent, v_analytics_sent, v_waitlist_sent
  from deleted;

  delete from public.ops_sync_outbox
  where status = 'failed'
    and coalesce(last_attempt_at, created_at) < now() - make_interval(days => greatest(1, coalesce(p_failed_days, 30)));
  get diagnostics v_failed = row_count;

  delete from public.ops_sync_outbox
  where status = 'dead'
    and coalesce(last_attempt_at, created_at) < now() - make_interval(days => greatest(1, coalesce(p_dead_days, 45)));
  get diagnostics v_dead = row_count;

  return jsonb_build_object(
    'sent_observability_deleted', v_obs_sent,
    'sent_support_deleted', v_support_sent,
    'sent_prelaunch_analytics_deleted', v_analytics_sent,
    'sent_prelaunch_waitlist_deleted', v_waitlist_sent,
    'failed_deleted', v_failed,
    'dead_deleted', v_dead
  );
end;
$$;

create or replace function public.ops_sync_trigger_cold_dispatch()
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  v_cfg record;
  v_url text;
  v_req_id bigint;
begin
  if not exists (select 1 from pg_extension where extname = 'pg_net') then
    return null;
  end if;

  select c.*
    into v_cfg
  from public.ops_sync_runtime_config c
  where c.enabled = true
  order by c.updated_at desc
  limit 1;

  if not found then
    return null;
  end if;

  v_url := rtrim(v_cfg.runtime_base_url, '/') || '/functions/v1/ops-telemetry-sync-dispatch';

  select net.http_post(
    url := v_url,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-ops-sync-cron-token', v_cfg.cron_token
    ),
    body := jsonb_build_object(
      'mode', 'cold',
      'trigger', 'pg_cron'
    )
  )
  into v_req_id;

  return v_req_id;
end;
$$;

grant execute on function public.ops_sync_enqueue(uuid, text, text, text, text, text, text, timestamptz, text, jsonb) to service_role;
grant execute on function public.ops_sync_claim_outbox(integer) to service_role;
grant execute on function public.ops_sync_cleanup(integer, integer, integer, integer, integer, integer) to service_role;
grant execute on function public.ops_sync_trigger_cold_dispatch() to service_role;

grant execute on function public.ops_sync_claim_outbox(integer) to authenticated;
grant execute on function public.ops_sync_cleanup(integer, integer, integer, integer, integer, integer) to authenticated;

grant select on public.ops_sync_outbox to authenticated;
grant select, insert, update, delete on public.ops_sync_outbox to service_role;
grant select on public.ops_sync_runtime_config to authenticated;
grant select, insert, update, delete on public.ops_sync_runtime_config to service_role;

alter table public.ops_sync_outbox enable row level security;
alter table public.ops_sync_runtime_config enable row level security;

drop policy if exists ops_sync_outbox_select_support_admin on public.ops_sync_outbox;
create policy ops_sync_outbox_select_support_admin
  on public.ops_sync_outbox
  for select to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and (public.is_admin() or public.is_support())
  );

drop policy if exists ops_sync_outbox_admin_manage on public.ops_sync_outbox;
create policy ops_sync_outbox_admin_manage
  on public.ops_sync_outbox
  for all to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and public.is_admin()
  )
  with check (
    tenant_id = public.current_usuario_tenant_id()
    and public.is_admin()
  );

drop policy if exists ops_sync_runtime_config_select_support_admin on public.ops_sync_runtime_config;
create policy ops_sync_runtime_config_select_support_admin
  on public.ops_sync_runtime_config
  for select to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and (public.is_admin() or public.is_support())
  );

drop policy if exists ops_sync_runtime_config_admin_manage on public.ops_sync_runtime_config;
create policy ops_sync_runtime_config_admin_manage
  on public.ops_sync_runtime_config
  for all to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and public.is_admin()
  )
  with check (
    tenant_id = public.current_usuario_tenant_id()
    and public.is_admin()
  );

create or replace function public.trg_ops_sync_obs_events()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_domain text;
  v_retention text;
begin
  v_domain := case when coalesce(new.event_domain, '') = 'support' then 'support' else 'observability' end;
  v_retention := case
    when coalesce(new.retention_tier, '') = 'long' then 'long'
    when new.level in ('fatal', 'error') then 'long'
    else 'short'
  end;

  perform public.ops_sync_enqueue(
    new.tenant_id,
    v_domain,
    'obs_events',
    new.id::text,
    format('obs_events:%s', new.id::text),
    coalesce(nullif(trim(new.app_id), ''), 'referidos-pwa'),
    coalesce(nullif(trim(new.event_type), ''), 'log'),
    coalesce(new.occurred_at, new.created_at, now()),
    v_retention,
    jsonb_build_object(
      'table', 'obs_events',
      'op', 'insert',
      'row', jsonb_strip_nulls(jsonb_build_object(
        'id', new.id,
        'issue_id', new.issue_id,
        'occurred_at', new.occurred_at,
        'level', new.level,
        'event_type', new.event_type,
        'source', new.source,
        'message', left(coalesce(new.message, ''), 4000),
        'error_code', new.error_code,
        'stack_preview', new.stack_preview,
        'fingerprint', new.fingerprint,
        'request_id', new.request_id,
        'trace_id', new.trace_id,
        'session_id', new.session_id,
        'app_id', new.app_id,
        'ip_hash', new.ip_hash,
        'event_domain', new.event_domain,
        'support_category', new.support_category,
        'support_route', new.support_route,
        'support_screen', new.support_screen,
        'support_flow', new.support_flow,
        'support_flow_step', new.support_flow_step,
        'support_thread_id', new.support_thread_id,
        'retention_tier', new.retention_tier,
        'retention_expires_at', new.retention_expires_at,
        'release', coalesce(new.release, '{}'::jsonb),
        'device', coalesce(new.device, '{}'::jsonb),
        'context', coalesce(new.context, '{}'::jsonb) - array['email','correo','phone','telefono','whatsapp','contact_value','ip','ip_address','authorization','token'],
        'breadcrumbs', coalesce(new.breadcrumbs, '[]'::jsonb),
        'user_ref', jsonb_strip_nulls(jsonb_build_object(
          'user_id', new.user_id,
          'auth_user_id', new.auth_user_id
        ))
      ))
    )
  );

  return new;
end;
$$;

drop trigger if exists trg_ops_sync_obs_events_ai on public.obs_events;
create trigger trg_ops_sync_obs_events_ai
after insert on public.obs_events
for each row execute function public.trg_ops_sync_obs_events();

create or replace function public.trg_ops_sync_prelaunch_events()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public.ops_sync_enqueue(
    new.tenant_id,
    'prelaunch_analytics',
    'prelaunch_events',
    new.id::text,
    format('prelaunch_events:%s', new.id::text),
    coalesce(nullif(trim(new.app_channel), ''), 'prelaunch_web'),
    coalesce(nullif(trim(new.event_type), ''), 'event'),
    coalesce(new.event_at, new.created_at, now()),
    'short',
    jsonb_build_object(
      'table', 'prelaunch_events',
      'op', 'insert',
      'row', jsonb_strip_nulls(jsonb_build_object(
        'id', new.id,
        'tenant_id', new.tenant_id,
        'app_channel', new.app_channel,
        'anon_id', new.anon_id,
        'visit_session_id', new.visit_session_id,
        'event_type', new.event_type,
        'event_at', new.event_at,
        'path', new.path,
        'props', coalesce(new.props, '{}'::jsonb),
        'ua_hash', new.ua_hash,
        'ua_family', new.ua_family,
        'os_family', new.os_family,
        'ip_risk_id', new.ip_risk_id,
        'created_at', new.created_at
      ))
    )
  );
  return new;
end;
$$;

drop trigger if exists trg_ops_sync_prelaunch_events_ai on public.prelaunch_events;
create trigger trg_ops_sync_prelaunch_events_ai
after insert on public.prelaunch_events
for each row execute function public.trg_ops_sync_prelaunch_events();

create or replace function public.trg_ops_sync_prelaunch_visitors()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_op text;
  v_hash text;
begin
  v_op := case when tg_op = 'INSERT' then 'insert' else 'update' end;
  v_hash := md5(coalesce(to_jsonb(new)::text, ''));

  perform public.ops_sync_enqueue(
    new.tenant_id,
    'prelaunch_analytics',
    'prelaunch_visitors',
    new.id::text,
    format('prelaunch_visitors:%s:%s', new.id::text, v_hash),
    coalesce(nullif(trim(new.app_channel), ''), 'prelaunch_web'),
    'visitor_upsert',
    coalesce(new.last_seen_at, new.first_seen_at, new.created_at, now()),
    'long',
    jsonb_build_object(
      'table', 'prelaunch_visitors',
      'op', v_op,
      'row', jsonb_strip_nulls(jsonb_build_object(
        'id', new.id,
        'tenant_id', new.tenant_id,
        'app_channel', new.app_channel,
        'anon_id', new.anon_id,
        'first_seen_at', new.first_seen_at,
        'last_seen_at', new.last_seen_at,
        'visit_count', new.visit_count,
        'ua_hash', new.ua_hash,
        'ua_family', new.ua_family,
        'os_family', new.os_family,
        'ip_risk_id', new.ip_risk_id,
        'country', new.country,
        'city', new.city,
        'last_utm_source', new.last_utm_source,
        'last_utm_campaign', new.last_utm_campaign,
        'created_at', new.created_at,
        'updated_at', new.updated_at
      ))
    )
  );

  return new;
end;
$$;

drop trigger if exists trg_ops_sync_prelaunch_visitors_aiu on public.prelaunch_visitors;
create trigger trg_ops_sync_prelaunch_visitors_aiu
after insert or update on public.prelaunch_visitors
for each row execute function public.trg_ops_sync_prelaunch_visitors();

create or replace function public.trg_ops_sync_waitlist_signups()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_op text;
  v_hash text;
  v_email_hash text;
begin
  v_op := case when tg_op = 'INSERT' then 'insert' else 'update' end;
  v_hash := md5(coalesce(to_jsonb(new)::text, ''));

  v_email_hash := case
    when new.email_hash is not null and length(trim(new.email_hash)) > 0 then new.email_hash
    when new.email is not null and length(trim(new.email)) > 0 then encode(extensions.digest(convert_to(lower(trim(new.email)), 'UTF8'), 'sha256'), 'hex')
    else null
  end;

  perform public.ops_sync_enqueue(
    new.tenant_id,
    'prelaunch_waitlist',
    'waitlist_signups',
    new.id::text,
    format('waitlist_signups:%s:%s', new.id::text, v_hash),
    coalesce(nullif(trim(new.app_channel), ''), 'prelaunch_web'),
    'waitlist_upsert',
    coalesce(new.confirmed_at, new.created_at, now()),
    'long',
    jsonb_build_object(
      'table', 'waitlist_signups',
      'op', v_op,
      'row', jsonb_strip_nulls(jsonb_build_object(
        'id', new.id,
        'tenant_id', new.tenant_id,
        'app_channel', new.app_channel,
        'anon_id', new.anon_id,
        'visit_session_id', new.visit_session_id,
        'email_hash', v_email_hash,
        'email_masked', public.ops_sync_mask_email(new.email),
        'role_intent', new.role_intent,
        'status', new.status,
        'confirmed_at', new.confirmed_at,
        'utm', coalesce(new.utm, '{}'::jsonb),
        'risk_flags', coalesce(new.risk_flags, '{}'::jsonb),
        'ua_hash', new.ua_hash,
        'ip_risk_id', new.ip_risk_id,
        'created_at', new.created_at
      ))
    )
  );

  return new;
end;
$$;

drop trigger if exists trg_ops_sync_waitlist_signups_aiu on public.waitlist_signups;
create trigger trg_ops_sync_waitlist_signups_aiu
after insert or update on public.waitlist_signups
for each row execute function public.trg_ops_sync_waitlist_signups();

create or replace function public.trg_ops_sync_support_threads()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_tenant_id uuid;
  v_op text;
  v_hash text;
  v_event_type text;
begin
  v_op := case when tg_op = 'INSERT' then 'insert' else 'update' end;

  select u.tenant_id
    into v_tenant_id
  from public.usuarios u
  where u.id::text = coalesce(new.user_id, old.user_id)::text
  order by u.id::text asc
  limit 1;

  if v_tenant_id is null and new.anon_profile_id is not null then
    select u.tenant_id
      into v_tenant_id
    from public.support_threads t
    join public.usuarios u
      on u.id::text = t.user_id::text
    where t.anon_profile_id = new.anon_profile_id
      and t.user_id is not null
    order by t.created_at desc
    limit 1;
  end if;

  if v_tenant_id is null then
    v_tenant_id := public.ops_sync_default_tenant_id();
  end if;

  if tg_op = 'UPDATE' and new.status is distinct from old.status then
    v_event_type := 'thread_status_changed';
  elsif tg_op = 'INSERT' then
    v_event_type := 'thread_created';
  else
    v_event_type := 'thread_updated';
  end if;

  v_hash := md5(coalesce(to_jsonb(new)::text, ''));

  perform public.ops_sync_enqueue(
    v_tenant_id,
    'support',
    'support_threads',
    new.id::text,
    format('support_threads:%s:%s', new.id::text, v_hash),
    coalesce(nullif(trim(new.app_channel), ''), case when new.request_origin = 'anonymous' then 'prelaunch_web' else 'referidos-pwa' end),
    v_event_type,
    coalesce(new.updated_at, new.created_at, now()),
    case
      when new.severity in ('s0', 's1') then 'long'
      else 'short'
    end,
    jsonb_build_object(
      'table', 'support_threads',
      'op', v_op,
      'row', jsonb_strip_nulls(jsonb_build_object(
        'id', new.id,
        'public_id', new.public_id,
        'tenant_id', v_tenant_id,
        'user_id', new.user_id,
        'user_public_id', new.user_public_id,
        'request_origin', new.request_origin,
        'origin_source', new.origin_source,
        'anon_profile_id', new.anon_profile_id,
        'status', new.status,
        'category', new.category,
        'severity', new.severity,
        'summary', new.summary,
        'irregular', new.irregular,
        'personal_queue', new.personal_queue,
        'assigned_agent_id', new.assigned_agent_id,
        'created_by_agent_id', new.created_by_agent_id,
        'app_channel', new.app_channel,
        'anon_id', new.anon_id,
        'visit_session_id', new.visit_session_id,
        'ua_hash', new.ua_hash,
        'ip_risk_id', new.ip_risk_id,
        'created_at', new.created_at,
        'updated_at', new.updated_at,
        'closed_at', new.closed_at
      ))
    )
  );

  return new;
end;
$$;

drop trigger if exists trg_ops_sync_support_threads_aiu on public.support_threads;
create trigger trg_ops_sync_support_threads_aiu
after insert or update on public.support_threads
for each row execute function public.trg_ops_sync_support_threads();

create or replace function public.trg_ops_sync_support_thread_events()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_tenant_id uuid;
begin
  select u.tenant_id
    into v_tenant_id
  from public.support_threads t
  left join public.usuarios u
    on u.id::text = t.user_id::text
  where t.id = new.thread_id
  limit 1;

  if v_tenant_id is null then
    v_tenant_id := public.ops_sync_default_tenant_id();
  end if;

  perform public.ops_sync_enqueue(
    v_tenant_id,
    'support',
    'support_thread_events',
    new.id::text,
    format('support_thread_events:%s', new.id::text),
    'referidos-pwa',
    coalesce(new.event_type::text, 'thread_event'),
    coalesce(new.created_at, now()),
    'short',
    jsonb_build_object(
      'table', 'support_thread_events',
      'op', 'insert',
      'row', jsonb_strip_nulls(jsonb_build_object(
        'id', new.id,
        'thread_id', new.thread_id,
        'event_type', new.event_type,
        'actor_role', new.actor_role,
        'actor_id', new.actor_id,
        'details', coalesce(new.details, '{}'::jsonb) - array['email','correo','phone','telefono','whatsapp','contact_value'],
        'created_at', new.created_at
      ))
    )
  );

  return new;
end;
$$;

drop trigger if exists trg_ops_sync_support_thread_events_ai on public.support_thread_events;
create trigger trg_ops_sync_support_thread_events_ai
after insert on public.support_thread_events
for each row execute function public.trg_ops_sync_support_thread_events();

create or replace function public.trg_ops_sync_anon_support_profiles()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_tenant_id uuid;
  v_op text;
  v_hash text;
  v_contact_hash text;
begin
  v_op := case when tg_op = 'INSERT' then 'insert' else 'update' end;
  v_hash := md5(coalesce(to_jsonb(new)::text, ''));

  select u.tenant_id
    into v_tenant_id
  from public.support_threads t
  join public.usuarios u
    on u.id::text = t.user_id::text
  where t.anon_profile_id = new.id
    and t.user_id is not null
  order by t.created_at desc
  limit 1;

  if v_tenant_id is null then
    v_tenant_id := public.ops_sync_default_tenant_id();
  end if;

  v_contact_hash := case
    when new.contact_value is null or length(trim(new.contact_value)) = 0 then null
    else encode(extensions.digest(convert_to(lower(trim(new.contact_value)), 'UTF8'), 'sha256'), 'hex')
  end;

  perform public.ops_sync_enqueue(
    v_tenant_id,
    'support',
    'anon_support_profiles',
    new.id::text,
    format('anon_support_profiles:%s:%s', new.id::text, v_hash),
    'referidos-pwa',
    'anon_profile_upsert',
    coalesce(new.last_seen_at, new.created_at, now()),
    'long',
    jsonb_build_object(
      'table', 'anon_support_profiles',
      'op', v_op,
      'row', jsonb_strip_nulls(jsonb_build_object(
        'id', new.id,
        'tenant_id', v_tenant_id,
        'public_id', new.public_id,
        'contact_channel', new.contact_channel,
        'contact_hash', v_contact_hash,
        'contact_masked', public.mask_support_contact(new.contact_channel, new.contact_value),
        'display_name', new.display_name,
        'meta', coalesce(new.meta, '{}'::jsonb) - array['email','correo','phone','telefono','whatsapp','contact_value'],
        'created_at', new.created_at,
        'last_seen_at', new.last_seen_at
      ))
    )
  );

  return new;
end;
$$;

drop trigger if exists trg_ops_sync_anon_support_profiles_aiu on public.anon_support_profiles;
create trigger trg_ops_sync_anon_support_profiles_aiu
after insert or update on public.anon_support_profiles
for each row execute function public.trg_ops_sync_anon_support_profiles();

do $$
begin
  if exists (select 1 from pg_extension where extname = 'pg_cron') then
    perform cron.unschedule(j.jobid)
    from cron.job j
    where j.jobname = 'ops_sync_cold_dispatch_q3h';

    perform cron.unschedule(j.jobid)
    from cron.job j
    where j.jobname = 'ops_sync_cleanup_daily';

    perform cron.schedule(
      'ops_sync_cold_dispatch_q3h',
      '0 */3 * * *',
      'select public.ops_sync_trigger_cold_dispatch();'
    );

    perform cron.schedule(
      'ops_sync_cleanup_daily',
      '40 3 * * *',
      'select public.ops_sync_cleanup(7, 30, 14, 45, 30, 45);'
    );
  end if;
exception
  when others then
    null;
end;
$$;

commit;
