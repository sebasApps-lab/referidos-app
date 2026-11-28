-- 20260415_000043_ops_telemetry_dlq_metadata_only.sql
-- Convert DLQ from full raw_event storage to compact failure metadata.

drop trigger if exists trg_ops_telemetry_ingest_dlq_purge_groups_sync on public.ops_telemetry_ingest_dlq;

delete from public.ops_telemetry_ingest_dlq
where (created_at at time zone 'America/Guayaquil')::date <> date '2026-04-09';

alter table public.ops_telemetry_ingest_dlq
  add column if not exists source_table text,
  add column if not exists source_row_id text,
  add column if not exists source_app_id text,
  add column if not exists event_type text,
  add column if not exists retention_tier text,
  add column if not exists occurred_at timestamptz,
  add column if not exists ingest_mode text,
  add column if not exists panel_key text,
  add column if not exists payload_type text,
  add column if not exists payload_keys text[] not null default '{}'::text[],
  add column if not exists payload_key_count integer not null default 0,
  add column if not exists payload_size_bytes integer not null default 0,
  add column if not exists raw_event_size_bytes integer not null default 0;

update public.ops_telemetry_ingest_dlq d
set
  source_table = coalesce(nullif(trim(d.source_table), ''), nullif(trim(d.raw_event->>'source_table'), ''), 'unknown_table'),
  source_row_id = coalesce(nullif(trim(d.source_row_id), ''), nullif(trim(d.raw_event->>'source_row_id'), ''), 'unknown_row'),
  source_app_id = coalesce(nullif(trim(d.source_app_id), ''), nullif(trim(d.raw_event->>'source_app_id'), ''), 'unknown_app'),
  event_type = coalesce(nullif(trim(d.event_type), ''), nullif(trim(d.raw_event->>'event_type'), ''), 'event'),
  retention_tier = case
    when lower(coalesce(nullif(trim(d.retention_tier), ''), d.raw_event->>'retention_tier', 'short')) = 'long' then 'long'
    else 'short'
  end,
  occurred_at = coalesce(d.occurred_at, d.created_at),
  ingest_mode = coalesce(nullif(trim(d.ingest_mode), ''), 'hot'),
  panel_key = nullif(trim(d.panel_key), ''),
  payload_type = case
    when jsonb_typeof(d.raw_event->'payload') in ('object', 'array') then jsonb_typeof(d.raw_event->'payload')
    else 'null'
  end,
  payload_keys = case
    when jsonb_typeof(d.raw_event->'payload') = 'object' then (
      select coalesce(array_agg(key order by key), '{}'::text[])
      from (
        select key
        from jsonb_object_keys(d.raw_event->'payload') key
        order by key
        limit 12
      ) k
    )
    else '{}'::text[]
  end,
  payload_key_count = case
    when jsonb_typeof(d.raw_event->'payload') = 'object' then (
      select count(*)::integer
      from jsonb_object_keys(d.raw_event->'payload') key
    )
    when jsonb_typeof(d.raw_event->'payload') = 'array' then coalesce(jsonb_array_length(d.raw_event->'payload'), 0)
    else 0
  end,
  payload_size_bytes = case
    when jsonb_typeof(d.raw_event->'payload') in ('object', 'array') then octet_length((d.raw_event->'payload')::text)
    else 0
  end::integer,
  raw_event_size_bytes = octet_length(coalesce(d.raw_event, '{}'::jsonb)::text)::integer;

alter table public.ops_telemetry_ingest_dlq
  alter column source_table set default 'unknown_table',
  alter column source_table set not null,
  alter column source_row_id set default 'unknown_row',
  alter column source_row_id set not null,
  alter column source_app_id set default 'unknown_app',
  alter column source_app_id set not null,
  alter column event_type set default 'event',
  alter column event_type set not null,
  alter column retention_tier set default 'short',
  alter column retention_tier set not null,
  alter column occurred_at set default now(),
  alter column occurred_at set not null,
  alter column ingest_mode set default 'hot',
  alter column ingest_mode set not null,
  alter column payload_type set default 'null',
  alter column payload_type set not null;

alter table public.ops_telemetry_ingest_dlq
  drop column if exists raw_event;

alter table public.ops_telemetry_ingest_dlq_purge_groups
  add column if not exists total_raw_event_size_bytes bigint not null default 0,
  add column if not exists total_payload_size_bytes bigint not null default 0;

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
  v_payload_type text;
  v_payload_keys text[];
  v_payload_key_count integer;
  v_payload_size_bytes integer;
  v_raw_event_size_bytes integer;
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

      if v_domain not in ('observability', 'support', 'prelaunch_analytics', 'prelaunch_waitlist', 'versioning') then
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
        v_payload_type := coalesce(jsonb_typeof(v_payload), 'null');
        if v_payload_type = 'object' then
          select coalesce(array_agg(key order by key), '{}'::text[])
          into v_payload_keys
          from (
            select key
            from jsonb_object_keys(v_payload) key
            order by key
            limit 12
          ) k;

          select count(*)::integer
          into v_payload_key_count
          from jsonb_object_keys(v_payload) key;
        elsif v_payload_type = 'array' then
          v_payload_keys := '{}'::text[];
          v_payload_key_count := coalesce(jsonb_array_length(v_payload), 0);
        else
          v_payload_keys := '{}'::text[];
          v_payload_key_count := 0;
        end if;

        v_payload_size_bytes := case
          when v_payload is null then 0
          else octet_length(v_payload::text)
        end::integer;
        v_raw_event_size_bytes := octet_length(coalesce(v_item, '{}'::jsonb)::text)::integer;

        insert into public.ops_telemetry_ingest_dlq (
          tenant_id,
          source_project_ref,
          source_env_key,
          source_event_key,
          domain,
          reason,
          source_table,
          source_row_id,
          source_app_id,
          event_type,
          retention_tier,
          occurred_at,
          ingest_mode,
          panel_key,
          payload_type,
          payload_keys,
          payload_key_count,
          payload_size_bytes,
          raw_event_size_bytes,
          expires_at
        )
        values (
          v_tenant_id,
          nullif(trim(coalesce(p_source_project_ref, '')), ''),
          nullif(trim(coalesce(p_source_env_key, '')), ''),
          v_source_event_key,
          v_domain,
          left(sqlerrm, 2000),
          v_source_table,
          v_source_row_id,
          v_source_app_id,
          v_event_type,
          v_retention_tier,
          v_occurred_at,
          coalesce(nullif(trim(p_mode), ''), 'hot'),
          nullif(trim(coalesce(p_panel_key, '')), ''),
          v_payload_type,
          coalesce(v_payload_keys, '{}'::text[]),
          coalesce(v_payload_key_count, 0),
          coalesce(v_payload_size_bytes, 0),
          coalesce(v_raw_event_size_bytes, 0),
          now() + interval '3 days'
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

create or replace function public.ops_telemetry_ingest_dlq_purge_groups_upsert_row(
  p_source_project_ref text,
  p_source_env_key text,
  p_domain text,
  p_reason text,
  p_created_at timestamptz,
  p_expires_at timestamptz,
  p_raw_event_size_bytes integer,
  p_payload_size_bytes integer
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_group_key text;
  v_bucket_date date;
begin
  v_bucket_date := public.ops_telemetry_ingest_dlq_purge_bucket_date(p_expires_at);
  if v_bucket_date is null then
    return;
  end if;

  v_group_key := public.ops_telemetry_ingest_dlq_group_key(
    p_source_project_ref,
    p_source_env_key,
    p_domain,
    p_reason
  );

  insert into public.ops_telemetry_ingest_dlq_purge_groups (
    purge_bucket_date,
    group_key,
    source_project_ref,
    source_env_key,
    domain,
    reason,
    event_count,
    total_raw_event_size_bytes,
    total_payload_size_bytes,
    first_created_at,
    last_created_at,
    first_expires_at,
    last_expires_at,
    updated_at
  )
  values (
    v_bucket_date,
    v_group_key,
    p_source_project_ref,
    p_source_env_key,
    p_domain,
    p_reason,
    1,
    greatest(coalesce(p_raw_event_size_bytes, 0), 0),
    greatest(coalesce(p_payload_size_bytes, 0), 0),
    p_created_at,
    p_created_at,
    p_expires_at,
    p_expires_at,
    now()
  )
  on conflict (purge_bucket_date, group_key) do update
  set
    event_count = public.ops_telemetry_ingest_dlq_purge_groups.event_count + 1,
    total_raw_event_size_bytes =
      public.ops_telemetry_ingest_dlq_purge_groups.total_raw_event_size_bytes + greatest(coalesce(p_raw_event_size_bytes, 0), 0),
    total_payload_size_bytes =
      public.ops_telemetry_ingest_dlq_purge_groups.total_payload_size_bytes + greatest(coalesce(p_payload_size_bytes, 0), 0),
    first_created_at = least(
      coalesce(public.ops_telemetry_ingest_dlq_purge_groups.first_created_at, excluded.first_created_at),
      excluded.first_created_at
    ),
    last_created_at = greatest(
      coalesce(public.ops_telemetry_ingest_dlq_purge_groups.last_created_at, excluded.last_created_at),
      excluded.last_created_at
    ),
    first_expires_at = least(
      coalesce(public.ops_telemetry_ingest_dlq_purge_groups.first_expires_at, excluded.first_expires_at),
      excluded.first_expires_at
    ),
    last_expires_at = greatest(
      coalesce(public.ops_telemetry_ingest_dlq_purge_groups.last_expires_at, excluded.last_expires_at),
      excluded.last_expires_at
    ),
    updated_at = now();
end;
$$;

create or replace function public.ops_telemetry_ingest_dlq_purge_groups_remove_row(
  p_source_project_ref text,
  p_source_env_key text,
  p_domain text,
  p_reason text,
  p_expires_at timestamptz,
  p_raw_event_size_bytes integer,
  p_payload_size_bytes integer
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_group_key text;
  v_bucket_date date;
begin
  v_bucket_date := public.ops_telemetry_ingest_dlq_purge_bucket_date(p_expires_at);
  if v_bucket_date is null then
    return;
  end if;

  v_group_key := public.ops_telemetry_ingest_dlq_group_key(
    p_source_project_ref,
    p_source_env_key,
    p_domain,
    p_reason
  );

  update public.ops_telemetry_ingest_dlq_purge_groups
  set
    event_count = greatest(event_count - 1, 0),
    total_raw_event_size_bytes = greatest(total_raw_event_size_bytes - greatest(coalesce(p_raw_event_size_bytes, 0), 0), 0),
    total_payload_size_bytes = greatest(total_payload_size_bytes - greatest(coalesce(p_payload_size_bytes, 0), 0), 0),
    updated_at = now()
  where purge_bucket_date = v_bucket_date
    and group_key = v_group_key;

  delete from public.ops_telemetry_ingest_dlq_purge_groups
  where purge_bucket_date = v_bucket_date
    and group_key = v_group_key
    and event_count <= 0;
end;
$$;

create or replace function public.trg_ops_telemetry_ingest_dlq_purge_groups_sync()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'INSERT' then
    perform public.ops_telemetry_ingest_dlq_purge_groups_upsert_row(
      new.source_project_ref,
      new.source_env_key,
      new.domain,
      new.reason,
      new.created_at,
      new.expires_at,
      new.raw_event_size_bytes,
      new.payload_size_bytes
    );
    return new;
  end if;

  if tg_op = 'DELETE' then
    perform public.ops_telemetry_ingest_dlq_purge_groups_remove_row(
      old.source_project_ref,
      old.source_env_key,
      old.domain,
      old.reason,
      old.expires_at,
      old.raw_event_size_bytes,
      old.payload_size_bytes
    );
    return old;
  end if;

  if tg_op = 'UPDATE' and (
    old.source_project_ref is distinct from new.source_project_ref
    or old.source_env_key is distinct from new.source_env_key
    or old.domain is distinct from new.domain
    or old.reason is distinct from new.reason
    or old.created_at is distinct from new.created_at
    or old.expires_at is distinct from new.expires_at
    or old.raw_event_size_bytes is distinct from new.raw_event_size_bytes
    or old.payload_size_bytes is distinct from new.payload_size_bytes
  ) then
    perform public.ops_telemetry_ingest_dlq_purge_groups_remove_row(
      old.source_project_ref,
      old.source_env_key,
      old.domain,
      old.reason,
      old.expires_at,
      old.raw_event_size_bytes,
      old.payload_size_bytes
    );
    perform public.ops_telemetry_ingest_dlq_purge_groups_upsert_row(
      new.source_project_ref,
      new.source_env_key,
      new.domain,
      new.reason,
      new.created_at,
      new.expires_at,
      new.raw_event_size_bytes,
      new.payload_size_bytes
    );
  end if;

  return new;
end;
$$;

truncate table public.ops_telemetry_ingest_dlq_purge_groups;

insert into public.ops_telemetry_ingest_dlq_purge_groups (
  purge_bucket_date,
  group_key,
  source_project_ref,
  source_env_key,
  domain,
  reason,
  event_count,
  total_raw_event_size_bytes,
  total_payload_size_bytes,
  first_created_at,
  last_created_at,
  first_expires_at,
  last_expires_at,
  updated_at
)
select
  public.ops_telemetry_ingest_dlq_purge_bucket_date(d.expires_at) as purge_bucket_date,
  public.ops_telemetry_ingest_dlq_group_key(
    d.source_project_ref,
    d.source_env_key,
    d.domain,
    d.reason
  ) as group_key,
  d.source_project_ref,
  d.source_env_key,
  d.domain,
  d.reason,
  count(*)::bigint as event_count,
  coalesce(sum(d.raw_event_size_bytes), 0)::bigint as total_raw_event_size_bytes,
  coalesce(sum(d.payload_size_bytes), 0)::bigint as total_payload_size_bytes,
  min(d.created_at) as first_created_at,
  max(d.created_at) as last_created_at,
  min(d.expires_at) as first_expires_at,
  max(d.expires_at) as last_expires_at,
  now() as updated_at
from public.ops_telemetry_ingest_dlq d
group by
  public.ops_telemetry_ingest_dlq_purge_bucket_date(d.expires_at),
  public.ops_telemetry_ingest_dlq_group_key(
    d.source_project_ref,
    d.source_env_key,
    d.domain,
    d.reason
  ),
  d.source_project_ref,
  d.source_env_key,
  d.domain,
  d.reason;

create or replace function public.ops_telemetry_ingest_dlq_summary_for_next_purge()
returns table (
  next_purge_at timestamptz,
  total_events bigint,
  total_groups bigint,
  approx_raw_event_bytes bigint,
  first_expires_at timestamptz,
  last_expires_at timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  with schedule as (
    select
      public.ops_telemetry_next_purge_at() as next_purge_at,
      (public.ops_telemetry_next_purge_at() at time zone 'America/Guayaquil')::date as next_bucket_date
  ),
  candidates as (
    select g.*
    from public.ops_telemetry_ingest_dlq_purge_groups g
    cross join schedule s
    where g.purge_bucket_date <= s.next_bucket_date
  )
  select
    s.next_purge_at,
    coalesce(sum(c.event_count), 0)::bigint as total_events,
    count(distinct c.group_key)::bigint as total_groups,
    coalesce(sum(c.total_raw_event_size_bytes), 0)::bigint as approx_raw_event_bytes,
    min(c.first_expires_at) as first_expires_at,
    max(c.last_expires_at) as last_expires_at
  from schedule s
  left join candidates c on true
  group by s.next_purge_at;
$$;

create or replace function public.ops_telemetry_ingest_dlq_groups_for_next_purge(
  p_limit integer default 50
)
returns table (
  group_key text,
  source_project_ref text,
  source_env_key text,
  domain text,
  reason text,
  event_count bigint,
  approx_raw_event_bytes bigint,
  first_created_at timestamptz,
  last_created_at timestamptz,
  first_expires_at timestamptz,
  last_expires_at timestamptz,
  next_purge_at timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  with schedule as (
    select
      public.ops_telemetry_next_purge_at() as next_purge_at,
      (public.ops_telemetry_next_purge_at() at time zone 'America/Guayaquil')::date as next_bucket_date
  ),
  candidates as (
    select
      g.*,
      s.next_purge_at
    from public.ops_telemetry_ingest_dlq_purge_groups g
    cross join schedule s
    where g.purge_bucket_date <= s.next_bucket_date
  )
  select
    c.group_key,
    c.source_project_ref,
    c.source_env_key,
    c.domain,
    c.reason,
    sum(c.event_count)::bigint as event_count,
    coalesce(sum(c.total_raw_event_size_bytes), 0)::bigint as approx_raw_event_bytes,
    min(c.first_created_at) as first_created_at,
    max(c.last_created_at) as last_created_at,
    min(c.first_expires_at) as first_expires_at,
    max(c.last_expires_at) as last_expires_at,
    max(c.next_purge_at) as next_purge_at
  from candidates c
  group by
    c.group_key,
    c.source_project_ref,
    c.source_env_key,
    c.domain,
    c.reason
  order by event_count desc, last_expires_at asc, last_created_at desc
  limit least(greatest(coalesce(p_limit, 50), 1), 200);
$$;

drop function if exists public.ops_telemetry_ingest_dlq_events_for_next_purge(text, integer, integer);

create function public.ops_telemetry_ingest_dlq_events_for_next_purge(
  p_group_key text default null,
  p_limit integer default 100,
  p_offset integer default 0
)
returns table (
  total_count bigint,
  group_key text,
  next_purge_at timestamptz,
  id uuid,
  tenant_id uuid,
  source_project_ref text,
  source_env_key text,
  source_event_key text,
  domain text,
  reason text,
  source_table text,
  source_row_id text,
  source_app_id text,
  event_type text,
  retention_tier text,
  occurred_at timestamptz,
  ingest_mode text,
  panel_key text,
  payload_type text,
  payload_keys text[],
  payload_key_count integer,
  payload_size_bytes integer,
  raw_event_size_bytes integer,
  created_at timestamptz,
  expires_at timestamptz,
  updated_at timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  with schedule as (
    select public.ops_telemetry_next_purge_at() as next_purge_at
  ),
  filtered as (
    select
      public.ops_telemetry_ingest_dlq_group_key(
        d.source_project_ref,
        d.source_env_key,
        d.domain,
        d.reason
      ) as group_key,
      s.next_purge_at,
      d.id,
      d.tenant_id,
      d.source_project_ref,
      d.source_env_key,
      d.source_event_key,
      d.domain,
      d.reason,
      d.source_table,
      d.source_row_id,
      d.source_app_id,
      d.event_type,
      d.retention_tier,
      d.occurred_at,
      d.ingest_mode,
      d.panel_key,
      d.payload_type,
      d.payload_keys,
      d.payload_key_count,
      d.payload_size_bytes,
      d.raw_event_size_bytes,
      d.created_at,
      d.expires_at,
      d.updated_at
    from public.ops_telemetry_ingest_dlq d
    cross join schedule s
    where d.expires_at <= s.next_purge_at
      and (
        nullif(trim(coalesce(p_group_key, '')), '') is null
        or public.ops_telemetry_ingest_dlq_group_key(
          d.source_project_ref,
          d.source_env_key,
          d.domain,
          d.reason
        ) = trim(p_group_key)
      )
  ),
  counted as (
    select
      count(*) over ()::bigint as total_count,
      f.*
    from filtered f
  )
  select
    c.total_count,
    c.group_key,
    c.next_purge_at,
    c.id,
    c.tenant_id,
    c.source_project_ref,
    c.source_env_key,
    c.source_event_key,
    c.domain,
    c.reason,
    c.source_table,
    c.source_row_id,
    c.source_app_id,
    c.event_type,
    c.retention_tier,
    c.occurred_at,
    c.ingest_mode,
    c.panel_key,
    c.payload_type,
    c.payload_keys,
    c.payload_key_count,
    c.payload_size_bytes,
    c.raw_event_size_bytes,
    c.created_at,
    c.expires_at,
    c.updated_at
  from counted c
  order by c.expires_at asc, c.created_at desc, c.id desc
  offset greatest(coalesce(p_offset, 0), 0)
  limit least(greatest(coalesce(p_limit, 100), 1), 200);
$$;

grant execute on function public.ops_telemetry_ingest_batch(text, text, text, text, text, jsonb) to service_role;
grant execute on function public.ops_telemetry_ingest_dlq_purge_groups_upsert_row(text, text, text, text, timestamptz, timestamptz, integer, integer) to service_role;
grant execute on function public.ops_telemetry_ingest_dlq_purge_groups_remove_row(text, text, text, text, timestamptz, integer, integer) to service_role;
