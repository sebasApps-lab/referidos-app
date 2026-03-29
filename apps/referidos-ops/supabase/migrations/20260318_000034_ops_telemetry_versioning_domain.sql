begin;

alter table public.ops_telemetry_retention_policies
  drop constraint if exists ops_telemetry_retention_policies_domain_check;

alter table public.ops_telemetry_retention_policies
  add constraint ops_telemetry_retention_policies_domain_check
  check (domain in ('observability', 'support', 'prelaunch_analytics', 'prelaunch_waitlist', 'versioning'));

alter table public.ops_telemetry_ingested_keys
  drop constraint if exists ops_telemetry_ingested_keys_domain_check;

alter table public.ops_telemetry_ingested_keys
  add constraint ops_telemetry_ingested_keys_domain_check
  check (domain in ('observability', 'support', 'prelaunch_analytics', 'prelaunch_waitlist', 'versioning'));

alter table public.ops_telemetry_events_hot
  drop constraint if exists ops_telemetry_events_hot_domain_check;

alter table public.ops_telemetry_events_hot
  add constraint ops_telemetry_events_hot_domain_check
  check (domain in ('observability', 'support', 'prelaunch_analytics', 'prelaunch_waitlist', 'versioning'));

alter table public.ops_telemetry_events_cold
  drop constraint if exists ops_telemetry_events_cold_domain_check;

alter table public.ops_telemetry_events_cold
  add constraint ops_telemetry_events_cold_domain_check
  check (domain in ('observability', 'support', 'prelaunch_analytics', 'prelaunch_waitlist', 'versioning'));

insert into public.ops_telemetry_retention_policies (domain, retention_tier, hot_ttl_days, cold_ttl_days, key_ttl_days)
values
  ('versioning', 'short', 14, 60, 60),
  ('versioning', 'long', 45, 180, 180)
on conflict (domain, retention_tier)
do update
set
  hot_ttl_days = excluded.hot_ttl_days,
  cold_ttl_days = excluded.cold_ttl_days,
  key_ttl_days = excluded.key_ttl_days;

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

commit;
