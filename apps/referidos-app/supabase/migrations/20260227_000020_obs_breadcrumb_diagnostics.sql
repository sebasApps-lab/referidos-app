-- 20260227_000020_obs_breadcrumb_diagnostics.sql
-- Diagnostico de breadcrumbs para observabilidad:
-- - metadatos persistidos por evento
-- - clasificacion de ausencia con causa

begin;

alter table public.obs_events
  add column if not exists breadcrumbs_count integer not null default 0,
  add column if not exists breadcrumbs_last_at timestamptz,
  add column if not exists breadcrumbs_source text not null default 'none',
  add column if not exists breadcrumbs_status text not null default 'missing_unknown',
  add column if not exists breadcrumbs_reason text,
  add column if not exists breadcrumbs_meta jsonb not null default '{}'::jsonb;

update public.obs_events
set breadcrumbs_count = case
  when jsonb_typeof(breadcrumbs) = 'array' then jsonb_array_length(breadcrumbs)
  else 0
end
where breadcrumbs_count is null
  or breadcrumbs_count < 0;

update public.obs_events
set breadcrumbs_last_at = case
  when breadcrumbs_count > 0 then coalesce(breadcrumbs_last_at, occurred_at)
  else null
end
where breadcrumbs_last_at is null;

update public.obs_events
set breadcrumbs_source = case
  when breadcrumbs_count > 0 then 'provided'
  else 'none'
end
where breadcrumbs_source is null
   or breadcrumbs_source not in ('memory', 'storage', 'merged', 'provided', 'none');

update public.obs_events
set breadcrumbs_status = case
  when breadcrumbs_count > 0 then 'present'
  else 'missing_unknown'
end
where breadcrumbs_status is null
   or breadcrumbs_status not in (
      'present',
      'missing_early_boot',
      'missing_runtime_failure',
      'missing_source_uninstrumented',
      'missing_payload_empty',
      'missing_storage_unavailable',
      'missing_unknown'
   );

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'obs_events_breadcrumbs_count_check'
  ) then
    alter table public.obs_events
      add constraint obs_events_breadcrumbs_count_check
      check (breadcrumbs_count >= 0);
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'obs_events_breadcrumbs_source_check'
  ) then
    alter table public.obs_events
      add constraint obs_events_breadcrumbs_source_check
      check (breadcrumbs_source in ('memory', 'storage', 'merged', 'provided', 'none'));
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'obs_events_breadcrumbs_status_check'
  ) then
    alter table public.obs_events
      add constraint obs_events_breadcrumbs_status_check
      check (
        breadcrumbs_status in (
          'present',
          'missing_early_boot',
          'missing_runtime_failure',
          'missing_source_uninstrumented',
          'missing_payload_empty',
          'missing_storage_unavailable',
          'missing_unknown'
        )
      );
  end if;
end $$;

create index if not exists idx_obs_events_tenant_breadcrumb_status_occurred
  on public.obs_events (tenant_id, breadcrumbs_status, occurred_at desc);

commit;

