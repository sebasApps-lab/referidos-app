-- 20260412_000040_ops_telemetry_dlq_retention_and_dashboard.sql
-- Reduce DLQ retention to 3 days, align purge schedule to 00:00 America/Guayaquil,
-- and expose grouped preview helpers for the admin dashboard.

create or replace function public.trg_ops_telemetry_ingest_dlq_expiry()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.expires_at is null then
    new.expires_at := coalesce(new.created_at, now()) + interval '3 days';
  end if;
  return new;
end;
$$;

update public.ops_telemetry_ingest_dlq
set expires_at = least(expires_at, created_at + interval '3 days')
where expires_at > created_at + interval '3 days';

create or replace function public.ops_telemetry_next_purge_at(
  p_now timestamptz default now()
)
returns timestamptz
language sql
stable
as $$
  select
    (
      date_trunc('day', p_now at time zone 'America/Guayaquil')
      + interval '1 day'
    ) at time zone 'America/Guayaquil';
$$;

create or replace function public.ops_telemetry_ingest_dlq_group_key(
  p_source_project_ref text,
  p_source_env_key text,
  p_domain text,
  p_reason text
)
returns text
language sql
immutable
as $$
  select md5(
    concat_ws(
      '|',
      coalesce(nullif(trim(p_source_project_ref), ''), '__null__'),
      coalesce(nullif(trim(p_source_env_key), ''), '__null__'),
      coalesce(nullif(trim(p_domain), ''), '__null__'),
      coalesce(nullif(trim(p_reason), ''), '__null__')
    )
  );
$$;

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
    select d.*
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
    coalesce(sum(octet_length(c.raw_event::text)), 0)::bigint as approx_raw_event_bytes,
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
      d.*,
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
    coalesce(sum(octet_length(c.raw_event::text)), 0)::bigint as approx_raw_event_bytes,
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

create or replace function public.ops_telemetry_ingest_dlq_events_for_next_purge(
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
  raw_event jsonb,
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
      d.raw_event,
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
    c.raw_event,
    c.created_at,
    c.expires_at,
    c.updated_at
  from counted c
  order by c.expires_at asc, c.created_at desc, c.id desc
  offset greatest(coalesce(p_offset, 0), 0)
  limit least(greatest(coalesce(p_limit, 100), 1), 200);
$$;

grant execute on function public.ops_telemetry_next_purge_at(timestamptz) to service_role;
grant execute on function public.ops_telemetry_ingest_dlq_group_key(text, text, text, text) to service_role;
grant execute on function public.ops_telemetry_ingest_dlq_summary_for_next_purge() to service_role;
grant execute on function public.ops_telemetry_ingest_dlq_groups_for_next_purge(integer) to service_role;
grant execute on function public.ops_telemetry_ingest_dlq_events_for_next_purge(text, integer, integer) to service_role;

do $$
begin
  if exists (select 1 from pg_extension where extname = 'pg_cron') then
    perform cron.unschedule(j.jobid)
    from cron.job j
    where j.jobname = 'ops_telemetry_purge_daily';

    perform cron.schedule(
      'ops_telemetry_purge_daily',
      '0 5 * * *',
      'select public.ops_telemetry_purge_expired();'
    );
  end if;
exception
  when others then
    raise notice 'ops_telemetry DLQ purge cron schedule skipped: %', sqlerrm;
end;
$$;
