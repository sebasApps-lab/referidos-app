-- 20260412_000042_ops_telemetry_dlq_preview_aggregate.sql
-- Maintain a lightweight aggregate for DLQ next-purge previews.

create or replace function public.ops_telemetry_ingest_dlq_purge_bucket_date(
  p_expires_at timestamptz
)
returns date
language plpgsql
immutable
as $$
declare
  v_local timestamp;
begin
  if p_expires_at is null then
    return null;
  end if;

  v_local := p_expires_at at time zone 'America/Guayaquil';
  if v_local = date_trunc('day', v_local) then
    return v_local::date;
  end if;
  return (v_local::date + 1);
end;
$$;

create table if not exists public.ops_telemetry_ingest_dlq_purge_groups (
  purge_bucket_date date not null,
  group_key text not null,
  source_project_ref text,
  source_env_key text,
  domain text,
  reason text,
  event_count bigint not null default 0,
  first_created_at timestamptz,
  last_created_at timestamptz,
  first_expires_at timestamptz,
  last_expires_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (purge_bucket_date, group_key)
);

create index if not exists idx_ops_telemetry_ingest_dlq_purge_groups_bucket
  on public.ops_telemetry_ingest_dlq_purge_groups (purge_bucket_date, event_count desc);

create or replace function public.ops_telemetry_ingest_dlq_purge_groups_upsert_row(
  p_source_project_ref text,
  p_source_env_key text,
  p_domain text,
  p_reason text,
  p_created_at timestamptz,
  p_expires_at timestamptz
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
    p_created_at,
    p_created_at,
    p_expires_at,
    p_expires_at,
    now()
  )
  on conflict (purge_bucket_date, group_key) do update
  set
    event_count = public.ops_telemetry_ingest_dlq_purge_groups.event_count + 1,
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
  p_expires_at timestamptz
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
      new.expires_at
    );
    return new;
  end if;

  if tg_op = 'DELETE' then
    perform public.ops_telemetry_ingest_dlq_purge_groups_remove_row(
      old.source_project_ref,
      old.source_env_key,
      old.domain,
      old.reason,
      old.expires_at
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
  ) then
    perform public.ops_telemetry_ingest_dlq_purge_groups_remove_row(
      old.source_project_ref,
      old.source_env_key,
      old.domain,
      old.reason,
      old.expires_at
    );
    perform public.ops_telemetry_ingest_dlq_purge_groups_upsert_row(
      new.source_project_ref,
      new.source_env_key,
      new.domain,
      new.reason,
      new.created_at,
      new.expires_at
    );
  end if;

  return new;
end;
$$;

drop trigger if exists trg_ops_telemetry_ingest_dlq_purge_groups_sync on public.ops_telemetry_ingest_dlq;
create trigger trg_ops_telemetry_ingest_dlq_purge_groups_sync
after insert or update or delete on public.ops_telemetry_ingest_dlq
for each row execute function public.trg_ops_telemetry_ingest_dlq_purge_groups_sync();

insert into public.ops_telemetry_ingest_dlq_purge_groups (
  purge_bucket_date,
  group_key,
  source_project_ref,
  source_env_key,
  domain,
  reason,
  event_count,
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
  d.reason
on conflict (purge_bucket_date, group_key) do update
set
  source_project_ref = excluded.source_project_ref,
  source_env_key = excluded.source_env_key,
  domain = excluded.domain,
  reason = excluded.reason,
  event_count = excluded.event_count,
  first_created_at = excluded.first_created_at,
  last_created_at = excluded.last_created_at,
  first_expires_at = excluded.first_expires_at,
  last_expires_at = excluded.last_expires_at,
  updated_at = now();

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
    null::bigint as approx_raw_event_bytes,
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
    null::bigint as approx_raw_event_bytes,
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

grant select on public.ops_telemetry_ingest_dlq_purge_groups to service_role;
grant execute on function public.ops_telemetry_ingest_dlq_purge_bucket_date(timestamptz) to service_role;
grant execute on function public.ops_telemetry_ingest_dlq_purge_groups_upsert_row(text, text, text, text, timestamptz, timestamptz) to service_role;
grant execute on function public.ops_telemetry_ingest_dlq_purge_groups_remove_row(text, text, text, text, timestamptz) to service_role;
