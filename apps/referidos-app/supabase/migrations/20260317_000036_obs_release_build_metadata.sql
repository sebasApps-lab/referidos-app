begin;

alter table public.obs_releases
  add column if not exists version_release_id text,
  add column if not exists build_number bigint,
  add column if not exists artifact_id text;

alter table public.obs_releases
  drop constraint if exists obs_releases_build_number_check;

alter table public.obs_releases
  add constraint obs_releases_build_number_check
  check (build_number is null or build_number >= 1);

create index if not exists idx_obs_releases_tenant_build_number
  on public.obs_releases (tenant_id, build_number, created_at desc)
  where build_number is not null;

alter table public.obs_events
  add column if not exists release_build_number bigint,
  add column if not exists release_artifact_id text,
  add column if not exists release_channel text;

alter table public.obs_events
  drop constraint if exists obs_events_release_build_number_check;

alter table public.obs_events
  add constraint obs_events_release_build_number_check
  check (release_build_number is null or release_build_number >= 1);

create index if not exists idx_obs_events_tenant_release_build_number
  on public.obs_events (tenant_id, release_build_number, occurred_at desc)
  where release_build_number is not null;

update public.obs_releases
set
  version_release_id = coalesce(nullif(trim(meta->'versioning'->>'release_id'), ''), version_release_id),
  build_number = coalesce(
    case
      when coalesce(meta->'versioning'->>'build_number', '') ~ '^[0-9]+$'
        then (meta->'versioning'->>'build_number')::bigint
      else null
    end,
    build_number
  ),
  artifact_id = coalesce(nullif(trim(meta->'versioning'->>'artifact_id'), ''), artifact_id)
where true;

update public.obs_events
set
  release_build_number = coalesce(
    case
      when coalesce(release->>'build_number', '') ~ '^[0-9]+$'
        then (release->>'build_number')::bigint
      else null
    end,
    release_build_number
  ),
  release_artifact_id = coalesce(nullif(trim(release->>'artifact_id'), ''), release_artifact_id),
  release_channel = coalesce(nullif(trim(release->>'channel'), ''), release_channel)
where true;

commit;
