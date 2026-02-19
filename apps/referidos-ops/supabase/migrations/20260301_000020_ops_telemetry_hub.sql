-- 20260301_000020_ops_telemetry_hub.sql
-- Central telemetry hub (hot/cold) + idempotent ingest + TTL and maintenance jobs.

begin;

create extension if not exists "pgcrypto" with schema extensions;

do $$
begin
  begin
    create extension if not exists pg_cron;
  exception
    when others then
      null;
  end;
end;
$$;

create table if not exists public.ops_telemetry_retention_policies (
  domain text not null
    check (domain in ('observability', 'support', 'prelaunch_analytics', 'prelaunch_waitlist')),
  retention_tier text not null
    check (retention_tier in ('short', 'long')),
  hot_ttl_days integer not null check (hot_ttl_days >= 1),
  cold_ttl_days integer not null check (cold_ttl_days >= 1),
  key_ttl_days integer not null check (key_ttl_days >= 1),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (domain, retention_tier)
);

drop trigger if exists trg_ops_telemetry_retention_policies_touch_updated_at on public.ops_telemetry_retention_policies;
create trigger trg_ops_telemetry_retention_policies_touch_updated_at
before update on public.ops_telemetry_retention_policies
for each row execute function public.touch_updated_at();

insert into public.ops_telemetry_retention_policies (domain, retention_tier, hot_ttl_days, cold_ttl_days, key_ttl_days)
values
  ('observability', 'short', 2, 30, 180),
  ('observability', 'long', 7, 180, 365),
  ('support', 'short', 7, 90, 180),
  ('support', 'long', 14, 365, 365),
  ('prelaunch_analytics', 'short', 2, 60, 180),
  ('prelaunch_analytics', 'long', 7, 180, 365),
  ('prelaunch_waitlist', 'short', 30, 180, 365),
  ('prelaunch_waitlist', 'long', 60, 365, 730)
on conflict (domain, retention_tier)
do update
set
  hot_ttl_days = excluded.hot_ttl_days,
  cold_ttl_days = excluded.cold_ttl_days,
  key_ttl_days = excluded.key_ttl_days,
  updated_at = now();

create table if not exists public.ops_telemetry_ingested_keys (
  source_event_key text primary key,
  tenant_id uuid not null,
  source_project_ref text not null check (length(trim(source_project_ref)) > 0),
  source_env_key text not null check (length(trim(source_env_key)) > 0),
  domain text not null
    check (domain in ('observability', 'support', 'prelaunch_analytics', 'prelaunch_waitlist')),
  retention_tier text not null
    check (retention_tier in ('short', 'long')),
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  expires_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_ops_telemetry_ingested_keys_tenant_domain
  on public.ops_telemetry_ingested_keys (tenant_id, domain, last_seen_at desc);

create index if not exists idx_ops_telemetry_ingested_keys_expires_at
  on public.ops_telemetry_ingested_keys (expires_at);

drop trigger if exists trg_ops_telemetry_ingested_keys_touch_updated_at on public.ops_telemetry_ingested_keys;
create trigger trg_ops_telemetry_ingested_keys_touch_updated_at
before update on public.ops_telemetry_ingested_keys
for each row execute function public.touch_updated_at();

create table if not exists public.ops_telemetry_events_hot (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null,
  domain text not null
    check (domain in ('observability', 'support', 'prelaunch_analytics', 'prelaunch_waitlist')),
  source_project_ref text not null check (length(trim(source_project_ref)) > 0),
  source_env_key text not null check (length(trim(source_env_key)) > 0),
  source_app_id text not null check (length(trim(source_app_id)) > 0),
  source_table text not null check (length(trim(source_table)) > 0),
  source_row_id text not null check (length(trim(source_row_id)) > 0),
  source_event_key text not null unique references public.ops_telemetry_ingested_keys(source_event_key) on delete restrict,
  event_type text not null check (length(trim(event_type)) > 0),
  retention_tier text not null
    check (retention_tier in ('short', 'long')),
  payload jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null,
  ingest_mode text not null default 'hot',
  ingest_actor text,
  panel_key text,
  ingested_at timestamptz not null default now(),
  expires_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_ops_telemetry_events_hot_tenant_domain_occurred
  on public.ops_telemetry_events_hot (tenant_id, domain, occurred_at desc);

create index if not exists idx_ops_telemetry_events_hot_source
  on public.ops_telemetry_events_hot (source_project_ref, source_env_key, domain, occurred_at desc);

create index if not exists idx_ops_telemetry_events_hot_expires_at
  on public.ops_telemetry_events_hot (expires_at);

drop trigger if exists trg_ops_telemetry_events_hot_touch_updated_at on public.ops_telemetry_events_hot;
create trigger trg_ops_telemetry_events_hot_touch_updated_at
before update on public.ops_telemetry_events_hot
for each row execute function public.touch_updated_at();

create table if not exists public.ops_telemetry_events_cold (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null,
  domain text not null
    check (domain in ('observability', 'support', 'prelaunch_analytics', 'prelaunch_waitlist')),
  source_project_ref text not null check (length(trim(source_project_ref)) > 0),
  source_env_key text not null check (length(trim(source_env_key)) > 0),
  source_app_id text not null check (length(trim(source_app_id)) > 0),
  source_table text not null check (length(trim(source_table)) > 0),
  source_row_id text not null check (length(trim(source_row_id)) > 0),
  source_event_key text not null unique references public.ops_telemetry_ingested_keys(source_event_key) on delete restrict,
  event_type text not null check (length(trim(event_type)) > 0),
  retention_tier text not null
    check (retention_tier in ('short', 'long')),
  payload jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null,
  ingest_mode text not null default 'cold',
  ingest_actor text,
  panel_key text,
  ingested_at timestamptz not null default now(),
  moved_to_cold_at timestamptz not null default now(),
  expires_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_ops_telemetry_events_cold_tenant_domain_occurred
  on public.ops_telemetry_events_cold (tenant_id, domain, occurred_at desc);

create index if not exists idx_ops_telemetry_events_cold_source
  on public.ops_telemetry_events_cold (source_project_ref, source_env_key, domain, occurred_at desc);

create index if not exists idx_ops_telemetry_events_cold_expires_at
  on public.ops_telemetry_events_cold (expires_at);

drop trigger if exists trg_ops_telemetry_events_cold_touch_updated_at on public.ops_telemetry_events_cold;
create trigger trg_ops_telemetry_events_cold_touch_updated_at
before update on public.ops_telemetry_events_cold
for each row execute function public.touch_updated_at();

create table if not exists public.ops_telemetry_ingest_dlq (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid,
  source_project_ref text,
  source_env_key text,
  source_event_key text,
  domain text,
  reason text not null,
  raw_event jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  updated_at timestamptz not null default now()
);

create index if not exists idx_ops_telemetry_ingest_dlq_created
  on public.ops_telemetry_ingest_dlq (created_at desc);

create index if not exists idx_ops_telemetry_ingest_dlq_expires
  on public.ops_telemetry_ingest_dlq (expires_at);

drop trigger if exists trg_ops_telemetry_ingest_dlq_touch_updated_at on public.ops_telemetry_ingest_dlq;
create trigger trg_ops_telemetry_ingest_dlq_touch_updated_at
before update on public.ops_telemetry_ingest_dlq
for each row execute function public.touch_updated_at();

create or replace function public.ops_telemetry_policy_days(
  p_domain text,
  p_retention_tier text
)
returns table (
  hot_ttl_days integer,
  cold_ttl_days integer,
  key_ttl_days integer
)
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  return query
  select
    p.hot_ttl_days,
    p.cold_ttl_days,
    p.key_ttl_days
  from public.ops_telemetry_retention_policies p
  where p.domain = p_domain
    and p.retention_tier = case when p_retention_tier = 'long' then 'long' else 'short' end
  limit 1;

  if not found then
    return query
    select 2, 30, 180;
  end if;
end;
$$;

create or replace function public.ops_telemetry_hot_expires_at(
  p_domain text,
  p_retention_tier text,
  p_occurred_at timestamptz
)
returns timestamptz
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_hot_days integer;
  v_cold_days integer;
  v_key_days integer;
begin
  select hot_ttl_days, cold_ttl_days, key_ttl_days
  into v_hot_days, v_cold_days, v_key_days
  from public.ops_telemetry_policy_days(p_domain, p_retention_tier)
  limit 1;

  return coalesce(p_occurred_at, now()) + make_interval(days => greatest(1, coalesce(v_hot_days, 2)));
end;
$$;

create or replace function public.ops_telemetry_cold_expires_at(
  p_domain text,
  p_retention_tier text,
  p_occurred_at timestamptz
)
returns timestamptz
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_hot_days integer;
  v_cold_days integer;
  v_key_days integer;
begin
  select hot_ttl_days, cold_ttl_days, key_ttl_days
  into v_hot_days, v_cold_days, v_key_days
  from public.ops_telemetry_policy_days(p_domain, p_retention_tier)
  limit 1;

  return coalesce(p_occurred_at, now()) + make_interval(days => greatest(1, coalesce(v_cold_days, 30)));
end;
$$;

create or replace function public.ops_telemetry_key_expires_at(
  p_domain text,
  p_retention_tier text,
  p_base_at timestamptz default now()
)
returns timestamptz
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_hot_days integer;
  v_cold_days integer;
  v_key_days integer;
begin
  select hot_ttl_days, cold_ttl_days, key_ttl_days
  into v_hot_days, v_cold_days, v_key_days
  from public.ops_telemetry_policy_days(p_domain, p_retention_tier)
  limit 1;

  return coalesce(p_base_at, now()) + make_interval(days => greatest(1, coalesce(v_key_days, 180)));
end;
$$;

create or replace function public.trg_ops_telemetry_ingested_keys_expiry()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.first_seen_at is null then
    new.first_seen_at := now();
  end if;

  if new.last_seen_at is null then
    new.last_seen_at := now();
  end if;

  if tg_op = 'INSERT' then
    new.expires_at := public.ops_telemetry_key_expires_at(new.domain, new.retention_tier, new.last_seen_at);
  else
    new.expires_at := greatest(
      coalesce(new.expires_at, '-infinity'::timestamptz),
      public.ops_telemetry_key_expires_at(new.domain, new.retention_tier, new.last_seen_at)
    );
  end if;

  return new;
end;
$$;

drop trigger if exists trg_ops_telemetry_ingested_keys_expiry on public.ops_telemetry_ingested_keys;
create trigger trg_ops_telemetry_ingested_keys_expiry
before insert or update on public.ops_telemetry_ingested_keys
for each row execute function public.trg_ops_telemetry_ingested_keys_expiry();

create or replace function public.trg_ops_telemetry_events_hot_expiry()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.expires_at := public.ops_telemetry_hot_expires_at(new.domain, new.retention_tier, new.occurred_at);
  return new;
end;
$$;

drop trigger if exists trg_ops_telemetry_events_hot_expiry on public.ops_telemetry_events_hot;
create trigger trg_ops_telemetry_events_hot_expiry
before insert or update of domain, retention_tier, occurred_at
on public.ops_telemetry_events_hot
for each row execute function public.trg_ops_telemetry_events_hot_expiry();

create or replace function public.trg_ops_telemetry_events_cold_expiry()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.expires_at := public.ops_telemetry_cold_expires_at(new.domain, new.retention_tier, new.occurred_at);
  return new;
end;
$$;

drop trigger if exists trg_ops_telemetry_events_cold_expiry on public.ops_telemetry_events_cold;
create trigger trg_ops_telemetry_events_cold_expiry
before insert or update of domain, retention_tier, occurred_at
on public.ops_telemetry_events_cold
for each row execute function public.trg_ops_telemetry_events_cold_expiry();

create or replace function public.trg_ops_telemetry_ingest_dlq_expiry()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.expires_at is null then
    new.expires_at := now() + interval '30 days';
  end if;
  return new;
end;
$$;

drop trigger if exists trg_ops_telemetry_ingest_dlq_expiry on public.ops_telemetry_ingest_dlq;
create trigger trg_ops_telemetry_ingest_dlq_expiry
before insert on public.ops_telemetry_ingest_dlq
for each row execute function public.trg_ops_telemetry_ingest_dlq_expiry();

create or replace function public.ops_telemetry_ingest_batch(
  p_source_project_ref text,
  p_source_env_key text,
  p_actor text default null,
  p_panel_key text default null,
  p_mode text default 'hot',
  p_batch jsonb default '[]'::jsonb
)
returns table (
  source_event_key text,
  status text,
  detail text,
  event_id uuid
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_item jsonb;
  v_source_event_key text;
  v_tenant_id uuid;
  v_domain text;
  v_source_table text;
  v_source_row_id text;
  v_source_app_id text;
  v_event_type text;
  v_retention_tier text;
  v_payload jsonb;
  v_occurred_at timestamptz;
  v_event_id uuid;
  v_inserted boolean;
begin
  if coalesce(jsonb_typeof(p_batch), '') <> 'array' then
    raise exception 'ops_telemetry_ingest_batch: p_batch must be a JSON array' using errcode = '22023';
  end if;

  for v_item in
    select value
    from jsonb_array_elements(p_batch)
  loop
    begin
      v_source_event_key := nullif(trim(coalesce(v_item->>'source_event_key', '')), '');
      v_domain := nullif(trim(coalesce(v_item->>'domain', '')), '');
      v_source_table := coalesce(nullif(trim(coalesce(v_item->>'source_table', '')), ''), 'unknown_table');
      v_source_row_id := coalesce(nullif(trim(coalesce(v_item->>'source_row_id', '')), ''), 'unknown_row');
      v_source_app_id := coalesce(nullif(trim(coalesce(v_item->>'source_app_id', '')), ''), 'unknown_app');
      v_event_type := coalesce(nullif(trim(coalesce(v_item->>'event_type', '')), ''), 'event');
      v_retention_tier := case when lower(coalesce(v_item->>'retention_tier', 'short')) = 'long' then 'long' else 'short' end;
      v_payload := case
        when jsonb_typeof(v_item->'payload') in ('object', 'array') then v_item->'payload'
        else '{}'::jsonb
      end;

      if v_source_event_key is null then
        raise exception 'missing source_event_key';
      end if;

      if v_domain not in ('observability', 'support', 'prelaunch_analytics', 'prelaunch_waitlist') then
        raise exception 'invalid domain: %', coalesce(v_domain, 'null');
      end if;

      begin
        v_tenant_id := (v_item->>'tenant_id')::uuid;
      exception
        when others then
          raise exception 'invalid tenant_id';
      end;

      begin
        v_occurred_at := coalesce((v_item->>'occurred_at')::timestamptz, now());
      exception
        when others then
          v_occurred_at := now();
      end;

      with inserted_key as (
        insert into public.ops_telemetry_ingested_keys (
          source_event_key,
          tenant_id,
          source_project_ref,
          source_env_key,
          domain,
          retention_tier,
          first_seen_at,
          last_seen_at
        )
        values (
          v_source_event_key,
          v_tenant_id,
          coalesce(nullif(trim(p_source_project_ref), ''), 'unknown_project'),
          coalesce(nullif(trim(p_source_env_key), ''), 'unknown_env'),
          v_domain,
          v_retention_tier,
          now(),
          now()
        )
        on conflict (source_event_key) do nothing
        returning source_event_key
      )
      select exists(select 1 from inserted_key)
      into v_inserted;

      if not v_inserted then
        update public.ops_telemetry_ingested_keys
        set
          last_seen_at = now(),
          expires_at = greatest(expires_at, public.ops_telemetry_key_expires_at(domain, retention_tier, now())),
          updated_at = now()
        where source_event_key = v_source_event_key;

        source_event_key := v_source_event_key;
        status := 'duplicate';
        detail := 'already_ingested';
        event_id := null;
        return next;
        continue;
      end if;

      insert into public.ops_telemetry_events_hot (
        tenant_id,
        domain,
        source_project_ref,
        source_env_key,
        source_app_id,
        source_table,
        source_row_id,
        source_event_key,
        event_type,
        retention_tier,
        payload,
        occurred_at,
        ingest_mode,
        ingest_actor,
        panel_key,
        ingested_at
      )
      values (
        v_tenant_id,
        v_domain,
        coalesce(nullif(trim(p_source_project_ref), ''), 'unknown_project'),
        coalesce(nullif(trim(p_source_env_key), ''), 'unknown_env'),
        v_source_app_id,
        v_source_table,
        v_source_row_id,
        v_source_event_key,
        v_event_type,
        v_retention_tier,
        v_payload,
        v_occurred_at,
        coalesce(nullif(trim(p_mode), ''), 'hot'),
        nullif(trim(coalesce(p_actor, '')), ''),
        nullif(trim(coalesce(p_panel_key, '')), ''),
        now()
      )
      returning id into v_event_id;

      source_event_key := v_source_event_key;
      status := 'accepted';
      detail := null;
      event_id := v_event_id;
      return next;
    exception
      when others then
        insert into public.ops_telemetry_ingest_dlq (
          tenant_id,
          source_project_ref,
          source_env_key,
          source_event_key,
          domain,
          reason,
          raw_event,
          expires_at
        )
        values (
          v_tenant_id,
          nullif(trim(coalesce(p_source_project_ref, '')), ''),
          nullif(trim(coalesce(p_source_env_key, '')), ''),
          v_source_event_key,
          v_domain,
          left(sqlerrm, 2000),
          coalesce(v_item, '{}'::jsonb),
          now() + interval '30 days'
        );

        source_event_key := coalesce(v_source_event_key, nullif(trim(coalesce(v_item->>'source_event_key', '')), ''), '');
        status := 'rejected';
        detail := left(sqlerrm, 500);
        event_id := null;
        return next;
    end;
  end loop;
end;
$$;

create or replace function public.ops_telemetry_rollover_hot_to_cold(p_limit integer default 5000)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_limit integer;
  v_selected integer := 0;
  v_inserted integer := 0;
  v_deleted integer := 0;
begin
  v_limit := greatest(1, least(coalesce(p_limit, 5000), 50000));

  with target as (
    select h.*
    from public.ops_telemetry_events_hot h
    where h.expires_at <= now()
    order by h.occurred_at asc
    limit v_limit
    for update skip locked
  ),
  inserted as (
    insert into public.ops_telemetry_events_cold (
      tenant_id,
      domain,
      source_project_ref,
      source_env_key,
      source_app_id,
      source_table,
      source_row_id,
      source_event_key,
      event_type,
      retention_tier,
      payload,
      occurred_at,
      ingest_mode,
      ingest_actor,
      panel_key,
      ingested_at,
      moved_to_cold_at,
      expires_at,
      created_at,
      updated_at
    )
    select
      t.tenant_id,
      t.domain,
      t.source_project_ref,
      t.source_env_key,
      t.source_app_id,
      t.source_table,
      t.source_row_id,
      t.source_event_key,
      t.event_type,
      t.retention_tier,
      t.payload,
      t.occurred_at,
      'cold_rollover',
      t.ingest_actor,
      t.panel_key,
      t.ingested_at,
      now(),
      public.ops_telemetry_cold_expires_at(t.domain, t.retention_tier, t.occurred_at),
      now(),
      now()
    from target t
    on conflict (source_event_key) do nothing
    returning id
  ),
  deleted as (
    delete from public.ops_telemetry_events_hot h
    using target t
    where h.id = t.id
    returning h.id
  )
  select
    (select count(*)::integer from target),
    (select count(*)::integer from inserted),
    (select count(*)::integer from deleted)
  into v_selected, v_inserted, v_deleted;

  return jsonb_build_object(
    'selected', v_selected,
    'inserted_cold', v_inserted,
    'deleted_hot', v_deleted
  );
end;
$$;

create or replace function public.ops_telemetry_purge_expired()
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_hot integer := 0;
  v_cold integer := 0;
  v_keys integer := 0;
  v_dlq integer := 0;
begin
  delete from public.ops_telemetry_events_hot
  where expires_at <= now();
  get diagnostics v_hot = row_count;

  delete from public.ops_telemetry_events_cold
  where expires_at <= now();
  get diagnostics v_cold = row_count;

  delete from public.ops_telemetry_ingested_keys
  where expires_at <= now()
    and not exists (
      select 1
      from public.ops_telemetry_events_hot h
      where h.source_event_key = ops_telemetry_ingested_keys.source_event_key
    )
    and not exists (
      select 1
      from public.ops_telemetry_events_cold c
      where c.source_event_key = ops_telemetry_ingested_keys.source_event_key
    );
  get diagnostics v_keys = row_count;

  delete from public.ops_telemetry_ingest_dlq
  where expires_at <= now();
  get diagnostics v_dlq = row_count;

  return jsonb_build_object(
    'hot_deleted', v_hot,
    'cold_deleted', v_cold,
    'keys_deleted', v_keys,
    'dlq_deleted', v_dlq
  );
end;
$$;

create or replace view public.ops_telemetry_events as
select
  h.id,
  h.tenant_id,
  h.domain,
  h.source_project_ref,
  h.source_env_key,
  h.source_app_id,
  h.source_table,
  h.source_row_id,
  h.source_event_key,
  h.event_type,
  h.retention_tier,
  h.payload,
  h.occurred_at,
  h.ingest_mode,
  h.ingest_actor,
  h.panel_key,
  h.ingested_at,
  h.expires_at,
  'hot'::text as storage_tier,
  h.created_at,
  h.updated_at
from public.ops_telemetry_events_hot h
union all
select
  c.id,
  c.tenant_id,
  c.domain,
  c.source_project_ref,
  c.source_env_key,
  c.source_app_id,
  c.source_table,
  c.source_row_id,
  c.source_event_key,
  c.event_type,
  c.retention_tier,
  c.payload,
  c.occurred_at,
  c.ingest_mode,
  c.ingest_actor,
  c.panel_key,
  c.ingested_at,
  c.expires_at,
  'cold'::text as storage_tier,
  c.created_at,
  c.updated_at
from public.ops_telemetry_events_cold c;

alter view public.ops_telemetry_events set (security_invoker = true);

grant execute on function public.ops_telemetry_policy_days(text, text) to service_role;
grant execute on function public.ops_telemetry_hot_expires_at(text, text, timestamptz) to service_role;
grant execute on function public.ops_telemetry_cold_expires_at(text, text, timestamptz) to service_role;
grant execute on function public.ops_telemetry_key_expires_at(text, text, timestamptz) to service_role;
grant execute on function public.ops_telemetry_ingest_batch(text, text, text, text, text, jsonb) to service_role;
grant execute on function public.ops_telemetry_rollover_hot_to_cold(integer) to service_role;
grant execute on function public.ops_telemetry_purge_expired() to service_role;

grant execute on function public.ops_telemetry_rollover_hot_to_cold(integer) to authenticated;
grant execute on function public.ops_telemetry_purge_expired() to authenticated;

grant select on public.ops_telemetry_events to authenticated;
grant select on public.ops_telemetry_events to service_role;

grant select on public.ops_telemetry_retention_policies to authenticated;
grant select on public.ops_telemetry_events_hot to authenticated;
grant select on public.ops_telemetry_events_cold to authenticated;
grant select on public.ops_telemetry_ingested_keys to authenticated;
grant select on public.ops_telemetry_ingest_dlq to authenticated;

grant select, insert, update, delete on public.ops_telemetry_retention_policies to service_role;
grant select, insert, update, delete on public.ops_telemetry_events_hot to service_role;
grant select, insert, update, delete on public.ops_telemetry_events_cold to service_role;
grant select, insert, update, delete on public.ops_telemetry_ingested_keys to service_role;
grant select, insert, update, delete on public.ops_telemetry_ingest_dlq to service_role;

alter table public.ops_telemetry_retention_policies enable row level security;
alter table public.ops_telemetry_events_hot enable row level security;
alter table public.ops_telemetry_events_cold enable row level security;
alter table public.ops_telemetry_ingested_keys enable row level security;
alter table public.ops_telemetry_ingest_dlq enable row level security;

drop policy if exists ops_telemetry_retention_policies_select_support_admin on public.ops_telemetry_retention_policies;
create policy ops_telemetry_retention_policies_select_support_admin
  on public.ops_telemetry_retention_policies
  for select to authenticated
  using (public.is_admin() or public.is_support());

drop policy if exists ops_telemetry_retention_policies_admin_manage on public.ops_telemetry_retention_policies;
create policy ops_telemetry_retention_policies_admin_manage
  on public.ops_telemetry_retention_policies
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists ops_telemetry_events_hot_select_support_admin on public.ops_telemetry_events_hot;
create policy ops_telemetry_events_hot_select_support_admin
  on public.ops_telemetry_events_hot
  for select to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and (public.is_admin() or public.is_support())
  );

drop policy if exists ops_telemetry_events_cold_select_support_admin on public.ops_telemetry_events_cold;
create policy ops_telemetry_events_cold_select_support_admin
  on public.ops_telemetry_events_cold
  for select to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and (public.is_admin() or public.is_support())
  );

drop policy if exists ops_telemetry_ingested_keys_select_admin on public.ops_telemetry_ingested_keys;
create policy ops_telemetry_ingested_keys_select_admin
  on public.ops_telemetry_ingested_keys
  for select to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and public.is_admin()
  );

drop policy if exists ops_telemetry_ingest_dlq_select_admin on public.ops_telemetry_ingest_dlq;
create policy ops_telemetry_ingest_dlq_select_admin
  on public.ops_telemetry_ingest_dlq
  for select to authenticated
  using (public.is_admin());

do $$
begin
  if exists (select 1 from pg_extension where extname = 'pg_cron') then
    perform cron.unschedule(j.jobid)
    from cron.job j
    where j.jobname = 'ops_telemetry_rollover_q15m';

    perform cron.unschedule(j.jobid)
    from cron.job j
    where j.jobname = 'ops_telemetry_purge_daily';

    perform cron.schedule(
      'ops_telemetry_rollover_q15m',
      '*/15 * * * *',
      'select public.ops_telemetry_rollover_hot_to_cold(20000);'
    );

    perform cron.schedule(
      'ops_telemetry_purge_daily',
      '55 3 * * *',
      'select public.ops_telemetry_purge_expired();'
    );
  end if;
exception
  when others then
    null;
end;
$$;

commit;
