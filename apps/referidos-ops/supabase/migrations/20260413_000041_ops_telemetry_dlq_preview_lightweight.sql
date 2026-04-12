-- 20260412_000041_ops_telemetry_dlq_preview_lightweight.sql
-- Make next-purge preview lightweight: avoid scanning/decompressing raw_event payloads.

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
    select public.ops_telemetry_next_purge_at() as next_purge_at
  ),
  candidates as (
    select
      d.id,
      d.source_project_ref,
      d.source_env_key,
      d.domain,
      d.reason,
      d.expires_at
    from public.ops_telemetry_ingest_dlq d
    cross join schedule s
    where d.expires_at <= s.next_purge_at
  )
  select
    s.next_purge_at,
    count(c.id)::bigint as total_events,
    count(
      distinct public.ops_telemetry_ingest_dlq_group_key(
        c.source_project_ref,
        c.source_env_key,
        c.domain,
        c.reason
      )
    )::bigint as total_groups,
    null::bigint as approx_raw_event_bytes,
    min(c.expires_at) as first_expires_at,
    max(c.expires_at) as last_expires_at
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
    select public.ops_telemetry_next_purge_at() as next_purge_at
  ),
  candidates as (
    select
      d.source_project_ref,
      d.source_env_key,
      d.domain,
      d.reason,
      d.created_at,
      d.expires_at,
      public.ops_telemetry_ingest_dlq_group_key(
        d.source_project_ref,
        d.source_env_key,
        d.domain,
        d.reason
      ) as group_key,
      s.next_purge_at
    from public.ops_telemetry_ingest_dlq d
    cross join schedule s
    where d.expires_at <= s.next_purge_at
  )
  select
    c.group_key,
    c.source_project_ref,
    c.source_env_key,
    c.domain,
    c.reason,
    count(*)::bigint as event_count,
    null::bigint as approx_raw_event_bytes,
    min(c.created_at) as first_created_at,
    max(c.created_at) as last_created_at,
    min(c.expires_at) as first_expires_at,
    max(c.expires_at) as last_expires_at,
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
