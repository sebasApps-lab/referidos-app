begin;

alter table public.version_releases
  add column if not exists build_number bigint,
  add column if not exists channel text,
  add column if not exists pr_number integer,
  add column if not exists tag_name text,
  add column if not exists release_notes_auto text,
  add column if not exists release_notes_final text,
  add column if not exists ci_run_id bigint,
  add column if not exists ci_run_number bigint;

alter table public.version_releases
  drop constraint if exists version_releases_channel_check;

alter table public.version_releases
  add constraint version_releases_channel_check
  check (channel in ('dev', 'staging', 'prod'));

alter table public.version_releases
  drop constraint if exists version_releases_build_number_check;

alter table public.version_releases
  add constraint version_releases_build_number_check
  check (build_number is null or build_number >= 1);

update public.version_releases r
set channel = lower(e.env_key)
from public.version_environments e
where e.id = r.env_id
  and (r.channel is distinct from lower(e.env_key));

update public.version_releases
set release_notes_auto = nullif(trim(coalesce(metadata ->> 'release_notes', '')), '')
where release_notes_auto is null;

alter table public.version_releases
  alter column channel set not null;

create or replace function public.versioning_fill_release_channel()
returns trigger
language plpgsql
set search_path = public
as $$
declare
  v_env_key text;
begin
  select lower(env_key)
    into v_env_key
  from public.version_environments
  where id = new.env_id
  limit 1;

  if v_env_key is null then
    raise exception 'versioning_fill_release_channel: env_id % not found', new.env_id
      using errcode = '22023';
  end if;

  new.channel := v_env_key;
  if new.release_notes_auto is null then
    new.release_notes_auto := nullif(trim(coalesce(new.metadata ->> 'release_notes', '')), '');
  end if;
  return new;
end;
$$;

drop trigger if exists trg_version_releases_fill_channel on public.version_releases;
create trigger trg_version_releases_fill_channel
before insert or update of env_id on public.version_releases
for each row execute function public.versioning_fill_release_channel();

create table if not exists public.version_build_counters (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  product_id uuid not null references public.version_products(id) on delete cascade,
  channel text not null check (channel in ('dev', 'staging', 'prod')),
  last_build_number bigint not null default 0 check (last_build_number >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists idx_version_build_counters_unique
  on public.version_build_counters (tenant_id, product_id, channel);

drop trigger if exists trg_version_build_counters_touch_updated_at on public.version_build_counters;
create trigger trg_version_build_counters_touch_updated_at
before update on public.version_build_counters
for each row execute function public.touch_updated_at();

create or replace function public.versioning_allocate_build_number(
  p_release_id uuid,
  p_actor text default 'system'
)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  v_release record;
  v_counter_last bigint;
  v_new_build_number bigint;
begin
  if auth.uid() is not null and not public.versioning_is_admin() and coalesce(auth.role(), '') <> 'service_role' then
    raise exception 'versioning_allocate_build_number: forbidden' using errcode = '42501';
  end if;

  select
    r.id,
    r.tenant_id,
    r.product_id,
    r.build_number,
    lower(e.env_key) as env_key
  into v_release
  from public.version_releases r
  join public.version_environments e on e.id = r.env_id
  where r.id = p_release_id
  for update;

  if not found then
    raise exception 'versioning_allocate_build_number: release % not found', p_release_id
      using errcode = '22023';
  end if;

  if v_release.build_number is not null then
    return v_release.build_number;
  end if;

  insert into public.version_build_counters (
    tenant_id,
    product_id,
    channel,
    last_build_number
  )
  values (
    v_release.tenant_id,
    v_release.product_id,
    v_release.env_key,
    0
  )
  on conflict (tenant_id, product_id, channel) do nothing;

  select c.last_build_number
    into v_counter_last
  from public.version_build_counters c
  where c.tenant_id = v_release.tenant_id
    and c.product_id = v_release.product_id
    and c.channel = v_release.env_key
  for update;

  v_new_build_number := coalesce(v_counter_last, 0) + 1;

  update public.version_build_counters
  set
    last_build_number = v_new_build_number,
    updated_at = now()
  where tenant_id = v_release.tenant_id
    and product_id = v_release.product_id
    and channel = v_release.env_key;

  update public.version_releases
  set
    build_number = v_new_build_number,
    channel = v_release.env_key,
    updated_at = now()
  where id = v_release.id;

  insert into public.version_audit_log (
    tenant_id,
    actor,
    action,
    entity_type,
    entity_id,
    payload
  )
  values (
    v_release.tenant_id,
    coalesce(nullif(trim(p_actor), ''), 'system'),
    'allocate_build_number',
    'version_releases',
    v_release.id::text,
    jsonb_build_object(
      'build_number', v_new_build_number,
      'channel', v_release.env_key
    )
  );

  return v_new_build_number;
end;
$$;

create or replace function public.versioning_finalize_release_metadata(
  p_request_id uuid,
  p_actor text default 'github-actions',
  p_pr_number integer default null,
  p_tag_name text default null,
  p_release_notes_auto text default null,
  p_release_notes_final text default null,
  p_ci_run_id bigint default null,
  p_ci_run_number bigint default null,
  p_metadata jsonb default '{}'::jsonb
)
returns table(
  release_id uuid,
  build_number bigint,
  channel text,
  tag_name text
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_request public.version_deploy_requests%rowtype;
  v_release public.version_releases%rowtype;
  v_env_key text;
  v_actor text;
  v_tag_name text;
  v_build_number bigint;
begin
  if auth.uid() is not null and not public.versioning_is_admin() and coalesce(auth.role(), '') <> 'service_role' then
    raise exception 'versioning_finalize_release_metadata: forbidden' using errcode = '42501';
  end if;

  v_actor := coalesce(nullif(trim(p_actor), ''), 'github-actions');

  select *
    into v_request
  from public.version_deploy_requests
  where id = p_request_id
  for update;

  if not found then
    raise exception 'versioning_finalize_release_metadata: request % not found', p_request_id
      using errcode = '22023';
  end if;

  if v_request.status not in ('executed', 'approved') then
    raise exception 'versioning_finalize_release_metadata: request status % not allowed', v_request.status
      using errcode = '22023';
  end if;

  if coalesce(v_request.deployment_status, '') <> 'success' then
    raise exception 'versioning_finalize_release_metadata: deployment_status must be success'
      using errcode = '22023';
  end if;

  select r.*
    into v_release
  from public.version_releases r
  where r.id = v_request.release_id
  for update;

  if not found then
    raise exception 'versioning_finalize_release_metadata: release % not found', v_request.release_id
      using errcode = '22023';
  end if;

  select lower(e.env_key)
    into v_env_key
  from public.version_environments e
  where e.id = v_release.env_id
  limit 1;

  if v_env_key is null then
    raise exception 'versioning_finalize_release_metadata: env not found for release %', v_release.id
      using errcode = '22023';
  end if;

  v_build_number := public.versioning_allocate_build_number(v_release.id, v_actor);
  v_tag_name := nullif(trim(coalesce(p_tag_name, '')), '');

  if v_tag_name is null and v_env_key = 'prod' then
    v_tag_name := format('v%s.%s.%s', v_release.semver_major, v_release.semver_minor, v_release.semver_patch);
  end if;

  update public.version_releases
  set
    channel = v_env_key,
    build_number = coalesce(v_release.build_number, v_build_number),
    pr_number = coalesce(p_pr_number, pr_number),
    tag_name = coalesce(v_tag_name, tag_name),
    release_notes_auto = coalesce(nullif(trim(coalesce(p_release_notes_auto, '')), ''), release_notes_auto),
    release_notes_final = coalesce(nullif(trim(coalesce(p_release_notes_final, '')), ''), release_notes_final),
    ci_run_id = coalesce(p_ci_run_id, ci_run_id),
    ci_run_number = coalesce(p_ci_run_number, ci_run_number),
    metadata = coalesce(metadata, '{}'::jsonb) || coalesce(p_metadata, '{}'::jsonb),
    updated_at = now()
  where id = v_release.id;

  insert into public.version_audit_log (
    tenant_id,
    actor,
    action,
    entity_type,
    entity_id,
    payload
  )
  values (
    v_release.tenant_id,
    v_actor,
    'finalize_release_metadata',
    'version_releases',
    v_release.id::text,
    jsonb_build_object(
      'request_id', p_request_id,
      'build_number', v_build_number,
      'channel', v_env_key,
      'tag_name', v_tag_name,
      'pr_number', p_pr_number,
      'ci_run_id', p_ci_run_id,
      'ci_run_number', p_ci_run_number
    )
  );

  return query
  select
    r.id,
    r.build_number,
    r.channel,
    r.tag_name
  from public.version_releases r
  where r.id = v_release.id;
end;
$$;

create or replace view public.version_releases_labeled as
select
  r.id,
  r.tenant_id,
  p.product_key,
  p.name as product_name,
  e.env_key,
  e.name as env_name,
  r.semver_major,
  r.semver_minor,
  r.semver_patch,
  r.prerelease_tag,
  r.prerelease_no,
  case
    when r.prerelease_tag is null then public.versioning_format_semver(r.semver_major, r.semver_minor, r.semver_patch)
    else format(
      '%s-%s.%s',
      public.versioning_format_semver(r.semver_major, r.semver_minor, r.semver_patch),
      r.prerelease_tag,
      r.prerelease_no
    )
  end as version_label,
  r.status,
  r.source_commit_sha,
  r.source_changeset_id,
  r.created_by,
  r.created_at,
  r.updated_at,
  r.build_number,
  r.channel,
  r.pr_number,
  r.tag_name,
  r.release_notes_auto,
  r.release_notes_final,
  r.ci_run_id,
  r.ci_run_number
from public.version_releases r
join public.version_products p on p.id = r.product_id
join public.version_environments e on e.id = r.env_id;

alter view public.version_releases_labeled set (security_invoker = true);

grant select, insert, update, delete on public.version_build_counters to authenticated;
grant select, insert, update, delete on public.version_build_counters to service_role;

grant execute on function public.versioning_allocate_build_number(uuid, text) to authenticated;
grant execute on function public.versioning_allocate_build_number(uuid, text) to service_role;
grant execute on function public.versioning_finalize_release_metadata(uuid, text, integer, text, text, text, bigint, bigint, jsonb) to authenticated;
grant execute on function public.versioning_finalize_release_metadata(uuid, text, integer, text, text, text, bigint, bigint, jsonb) to service_role;

alter table public.version_build_counters enable row level security;

drop policy if exists version_build_counters_admin_all on public.version_build_counters;
create policy version_build_counters_admin_all
  on public.version_build_counters
  for all to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and public.versioning_is_admin()
  )
  with check (
    tenant_id = public.current_usuario_tenant_id()
    and public.versioning_is_admin()
  );

commit;
