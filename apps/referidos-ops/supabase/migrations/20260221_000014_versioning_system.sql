-- 20260220_000014_versioning_system.sql
-- Versioning system (global/product/component/release/promotions) baseline 0.5.0

begin;

create extension if not exists "pgcrypto" with schema extensions;

create or replace function public.versioning_is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.is_admin(), false);
$$;

create or replace function public.versioning_format_semver(
  p_major integer,
  p_minor integer,
  p_patch integer
)
returns text
language sql
immutable
as $$
  select format('%s.%s.%s', p_major, p_minor, p_patch);
$$;

create or replace function public.versioning_parse_semver(p_semver text)
returns table (
  major integer,
  minor integer,
  patch integer
)
language plpgsql
immutable
as $$
declare
  v_parts text[];
begin
  v_parts := regexp_match(trim(coalesce(p_semver, '')), '^([0-9]+)\.([0-9]+)\.([0-9]+)$');
  if v_parts is null then
    raise exception 'versioning_parse_semver: invalid semver "%" (expected X.Y.Z)', p_semver
      using errcode = '22023';
  end if;

  major := v_parts[1]::integer;
  minor := v_parts[2]::integer;
  patch := v_parts[3]::integer;
  return next;
end;
$$;

create table if not exists public.version_products (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  product_key text not null,
  name text not null,
  active boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint version_products_product_key_not_empty check (length(trim(product_key)) > 0),
  constraint version_products_name_not_empty check (length(trim(name)) > 0),
  unique (tenant_id, product_key)
);

create index if not exists idx_version_products_tenant_active
  on public.version_products (tenant_id, active, created_at desc);

create table if not exists public.version_environments (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  env_key text not null,
  name text not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint version_environments_env_key_check check (env_key in ('dev', 'staging', 'prod')),
  unique (tenant_id, env_key)
);

create table if not exists public.version_components (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  product_id uuid not null references public.version_products(id) on delete cascade,
  component_key text not null,
  component_type text not null,
  display_name text not null,
  owner text,
  criticality text not null default 'normal',
  active boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint version_components_component_key_not_empty check (length(trim(component_key)) > 0),
  constraint version_components_display_name_not_empty check (length(trim(display_name)) > 0),
  constraint version_components_component_type_check check (
    component_type in ('system', 'api', 'module', 'file', 'db_migration', 'edge_function', 'sdk_package')
  ),
  constraint version_components_criticality_check check (criticality in ('low', 'normal', 'high', 'critical')),
  unique (tenant_id, product_id, component_key)
);

create index if not exists idx_version_components_product_type
  on public.version_components (tenant_id, product_id, component_type, active, created_at desc);

create table if not exists public.version_component_paths (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  component_id uuid not null references public.version_components(id) on delete cascade,
  path_glob text not null,
  include boolean not null default true,
  created_at timestamptz not null default now(),
  constraint version_component_paths_path_not_empty check (length(trim(path_glob)) > 0),
  unique (component_id, path_glob)
);

create index if not exists idx_version_component_paths_component
  on public.version_component_paths (tenant_id, component_id, include, created_at desc);

create table if not exists public.version_component_dependencies (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  component_id uuid not null references public.version_components(id) on delete cascade,
  depends_on_component_id uuid not null references public.version_components(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (component_id, depends_on_component_id),
  constraint version_component_dependencies_no_self check (component_id <> depends_on_component_id)
);

create table if not exists public.version_component_revisions (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  component_id uuid not null references public.version_components(id) on delete cascade,
  revision_no integer not null,
  content_hash text not null,
  source_commit_sha text not null,
  source_branch text not null,
  bump_level text not null default 'patch',
  change_summary text,
  metadata jsonb not null default '{}'::jsonb,
  created_by text not null default 'ci',
  created_at timestamptz not null default now(),
  constraint version_component_revisions_revision_positive check (revision_no >= 1),
  constraint version_component_revisions_content_hash_not_empty check (length(trim(content_hash)) > 0),
  constraint version_component_revisions_commit_not_empty check (length(trim(source_commit_sha)) > 0),
  constraint version_component_revisions_branch_not_empty check (length(trim(source_branch)) > 0),
  constraint version_component_revisions_bump_level_check check (bump_level in ('none', 'patch', 'minor', 'major')),
  unique (component_id, revision_no)
);

create index if not exists idx_version_component_revisions_component_created
  on public.version_component_revisions (tenant_id, component_id, created_at desc);

create index if not exists idx_version_component_revisions_commit
  on public.version_component_revisions (tenant_id, source_commit_sha, created_at desc);

create table if not exists public.version_changesets (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  product_id uuid not null references public.version_products(id) on delete cascade,
  env_id uuid not null references public.version_environments(id) on delete cascade,
  branch text not null,
  commit_sha text not null,
  pr_number bigint,
  status text not null default 'detected',
  bump_level text not null default 'patch',
  notes text,
  created_by text not null default 'ci',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint version_changesets_branch_not_empty check (length(trim(branch)) > 0),
  constraint version_changesets_commit_not_empty check (length(trim(commit_sha)) > 0),
  constraint version_changesets_status_check check (status in ('detected', 'validated', 'rejected', 'applied')),
  constraint version_changesets_bump_level_check check (bump_level in ('none', 'patch', 'minor', 'major'))
);

create index if not exists idx_version_changesets_product_env_created
  on public.version_changesets (tenant_id, product_id, env_id, created_at desc);

create table if not exists public.version_changeset_items (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  changeset_id uuid not null references public.version_changesets(id) on delete cascade,
  component_id uuid not null references public.version_components(id) on delete cascade,
  previous_revision_id uuid references public.version_component_revisions(id),
  next_revision_id uuid not null references public.version_component_revisions(id),
  changed_paths jsonb not null default '[]'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (changeset_id, component_id)
);

create index if not exists idx_version_changeset_items_changeset
  on public.version_changeset_items (tenant_id, changeset_id, created_at desc);

create table if not exists public.version_releases (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  product_id uuid not null references public.version_products(id) on delete cascade,
  env_id uuid not null references public.version_environments(id) on delete cascade,
  semver_major integer not null,
  semver_minor integer not null,
  semver_patch integer not null,
  prerelease_tag text,
  prerelease_no integer,
  status text not null default 'draft',
  source_changeset_id uuid references public.version_changesets(id),
  source_commit_sha text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_by text not null default 'ci',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint version_releases_semver_non_negative check (
    semver_major >= 0 and semver_minor >= 0 and semver_patch >= 0
  ),
  constraint version_releases_prerelease_check check (
    (
      prerelease_tag is null and prerelease_no is null
    ) or (
      prerelease_tag in ('dev', 'rc') and prerelease_no is not null and prerelease_no >= 1
    )
  ),
  constraint version_releases_status_check check (
    status in ('draft', 'validated', 'approved', 'deployed', 'rolled_back')
  ),
  constraint version_releases_commit_not_empty check (length(trim(source_commit_sha)) > 0),
  unique nulls not distinct (
    tenant_id,
    product_id,
    env_id,
    semver_major,
    semver_minor,
    semver_patch,
    prerelease_tag,
    prerelease_no
  )
);

create index if not exists idx_version_releases_product_env_sort
  on public.version_releases (
    tenant_id,
    product_id,
    env_id,
    semver_major desc,
    semver_minor desc,
    semver_patch desc,
    coalesce(prerelease_no, 0) desc,
    created_at desc
  );

create table if not exists public.version_release_components (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  release_id uuid not null references public.version_releases(id) on delete cascade,
  component_id uuid not null references public.version_components(id) on delete cascade,
  component_revision_id uuid not null references public.version_component_revisions(id),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (release_id, component_id)
);

create index if not exists idx_version_release_components_release
  on public.version_release_components (tenant_id, release_id, created_at desc);

create table if not exists public.version_promotions (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  product_id uuid not null references public.version_products(id) on delete cascade,
  from_release_id uuid not null references public.version_releases(id),
  to_release_id uuid not null references public.version_releases(id),
  promoted_by text not null default 'ci',
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists idx_version_promotions_product_created
  on public.version_promotions (tenant_id, product_id, created_at desc);

create table if not exists public.version_deployments (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  release_id uuid not null references public.version_releases(id) on delete cascade,
  env_id uuid not null references public.version_environments(id) on delete cascade,
  deployment_id text not null,
  status text not null default 'started',
  logs_url text,
  metadata jsonb not null default '{}'::jsonb,
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint version_deployments_status_check check (status in ('started', 'success', 'failed')),
  constraint version_deployments_deployment_id_not_empty check (length(trim(deployment_id)) > 0)
);

create index if not exists idx_version_deployments_release_started
  on public.version_deployments (tenant_id, release_id, started_at desc);

create table if not exists public.version_audit_log (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  actor text not null,
  action text not null,
  entity_type text not null,
  entity_id text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  constraint version_audit_log_actor_not_empty check (length(trim(actor)) > 0),
  constraint version_audit_log_action_not_empty check (length(trim(action)) > 0),
  constraint version_audit_log_entity_type_not_empty check (length(trim(entity_type)) > 0),
  constraint version_audit_log_entity_id_not_empty check (length(trim(entity_id)) > 0)
);

create index if not exists idx_version_audit_log_tenant_created
  on public.version_audit_log (tenant_id, created_at desc);

drop trigger if exists trg_version_products_touch_updated_at on public.version_products;
create trigger trg_version_products_touch_updated_at
before update on public.version_products
for each row execute function public.touch_updated_at();

drop trigger if exists trg_version_environments_touch_updated_at on public.version_environments;
create trigger trg_version_environments_touch_updated_at
before update on public.version_environments
for each row execute function public.touch_updated_at();

drop trigger if exists trg_version_components_touch_updated_at on public.version_components;
create trigger trg_version_components_touch_updated_at
before update on public.version_components
for each row execute function public.touch_updated_at();

drop trigger if exists trg_version_changesets_touch_updated_at on public.version_changesets;
create trigger trg_version_changesets_touch_updated_at
before update on public.version_changesets
for each row execute function public.touch_updated_at();

drop trigger if exists trg_version_releases_touch_updated_at on public.version_releases;
create trigger trg_version_releases_touch_updated_at
before update on public.version_releases
for each row execute function public.touch_updated_at();

drop trigger if exists trg_version_deployments_touch_updated_at on public.version_deployments;
create trigger trg_version_deployments_touch_updated_at
before update on public.version_deployments
for each row execute function public.touch_updated_at();

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
  r.updated_at
from public.version_releases r
join public.version_products p on p.id = r.product_id
join public.version_environments e on e.id = r.env_id;

alter view public.version_releases_labeled set (security_invoker = true);

create or replace view public.version_latest_releases as
with ranked as (
  select
    vr.*,
    row_number() over (
      partition by vr.tenant_id, vr.product_key, vr.env_key
      order by
        vr.semver_major desc,
        vr.semver_minor desc,
        vr.semver_patch desc,
        case when vr.prerelease_tag is null then 1 else 0 end desc,
        coalesce(vr.prerelease_no, 0) desc,
        vr.created_at desc
    ) as rn
  from public.version_releases_labeled vr
)
select * from ranked where rn = 1;

alter view public.version_latest_releases set (security_invoker = true);

create or replace view public.version_release_components_labeled as
select
  rc.id,
  rc.tenant_id,
  rc.release_id,
  r.product_id,
  p.product_key,
  e.env_key,
  public.versioning_format_semver(r.semver_major, r.semver_minor, r.semver_patch) as semver,
  c.id as component_id,
  c.component_key,
  c.component_type,
  c.display_name as component_name,
  rev.id as revision_id,
  rev.revision_no,
  rev.bump_level,
  rev.content_hash,
  rev.source_commit_sha,
  rev.source_branch,
  rev.created_at as revision_created_at
from public.version_release_components rc
join public.version_releases r on r.id = rc.release_id
join public.version_products p on p.id = r.product_id
join public.version_environments e on e.id = r.env_id
join public.version_components c on c.id = rc.component_id
join public.version_component_revisions rev on rev.id = rc.component_revision_id;

alter view public.version_release_components_labeled set (security_invoker = true);

create or replace view public.version_component_latest_revisions as
with ranked as (
  select
    c.tenant_id,
    c.id as component_id,
    c.product_id,
    c.component_key,
    c.component_type,
    c.display_name,
    rev.id as revision_id,
    rev.revision_no,
    rev.content_hash,
    rev.source_commit_sha,
    rev.source_branch,
    rev.bump_level,
    rev.created_at,
    row_number() over (
      partition by c.id
      order by rev.revision_no desc, rev.created_at desc
    ) as rn
  from public.version_components c
  join public.version_component_revisions rev on rev.component_id = c.id
)
select *
from ranked
where rn = 1;

alter view public.version_component_latest_revisions set (security_invoker = true);

create or replace function public.versioning_get_drift(
  p_product_key text,
  p_env_a text,
  p_env_b text
)
returns table (
  component_key text,
  component_type text,
  revision_a integer,
  revision_b integer,
  differs boolean
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_tenant_id uuid;
  v_product_id uuid;
  v_env_a_id uuid;
  v_env_b_id uuid;
  v_release_a uuid;
  v_release_b uuid;
begin
  if auth.uid() is not null and not public.versioning_is_admin() then
    raise exception 'versioning_get_drift: forbidden' using errcode = '42501';
  end if;

  v_tenant_id := public.current_usuario_tenant_id();
  if v_tenant_id is null then
    select id into v_tenant_id
    from public.tenants
    order by created_at asc
    limit 1;
  end if;

  select vp.id
    into v_product_id
  from public.version_products vp
  where vp.tenant_id = v_tenant_id
    and vp.product_key = p_product_key
  limit 1;

  if v_product_id is null then
    raise exception 'versioning_get_drift: product "%" not found', p_product_key using errcode = '22023';
  end if;

  select id into v_env_a_id
  from public.version_environments
  where tenant_id = v_tenant_id and env_key = p_env_a
  limit 1;

  select id into v_env_b_id
  from public.version_environments
  where tenant_id = v_tenant_id and env_key = p_env_b
  limit 1;

  if v_env_a_id is null or v_env_b_id is null then
    raise exception 'versioning_get_drift: env "%" or "%" not found', p_env_a, p_env_b using errcode = '22023';
  end if;

  select r.id into v_release_a
  from public.version_releases r
  where r.tenant_id = v_tenant_id
    and r.product_id = v_product_id
    and r.env_id = v_env_a_id
  order by
    r.semver_major desc,
    r.semver_minor desc,
    r.semver_patch desc,
    case when r.prerelease_tag is null then 1 else 0 end desc,
    coalesce(r.prerelease_no, 0) desc,
    r.created_at desc
  limit 1;

  select r.id into v_release_b
  from public.version_releases r
  where r.tenant_id = v_tenant_id
    and r.product_id = v_product_id
    and r.env_id = v_env_b_id
  order by
    r.semver_major desc,
    r.semver_minor desc,
    r.semver_patch desc,
    case when r.prerelease_tag is null then 1 else 0 end desc,
    coalesce(r.prerelease_no, 0) desc,
    r.created_at desc
  limit 1;

  if v_release_a is null or v_release_b is null then
    return;
  end if;

  return query
  with
    a as (
      select rc.component_id, rev.revision_no
      from public.version_release_components rc
      join public.version_component_revisions rev on rev.id = rc.component_revision_id
      where rc.release_id = v_release_a
    ),
    b as (
      select rc.component_id, rev.revision_no
      from public.version_release_components rc
      join public.version_component_revisions rev on rev.id = rc.component_revision_id
      where rc.release_id = v_release_b
    )
  select
    c.component_key,
    c.component_type,
    a.revision_no as revision_a,
    b.revision_no as revision_b,
    coalesce(a.revision_no, -1) <> coalesce(b.revision_no, -1) as differs
  from public.version_components c
  left join a on a.component_id = c.id
  left join b on b.component_id = c.id
  where c.tenant_id = v_tenant_id
    and c.product_id = v_product_id
  order by c.component_key asc;
end;
$$;

create or replace function public.versioning_promote_release(
  p_product_key text,
  p_from_env text,
  p_to_env text,
  p_semver text,
  p_actor text default 'admin',
  p_notes text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_tenant_id uuid;
  v_product_id uuid;
  v_from_env_id uuid;
  v_to_env_id uuid;
  v_major integer;
  v_minor integer;
  v_patch integer;
  v_source_release_id uuid;
  v_target_release_id uuid;
begin
  if auth.uid() is not null and not public.versioning_is_admin() then
    raise exception 'versioning_promote_release: forbidden' using errcode = '42501';
  end if;

  select major, minor, patch
    into v_major, v_minor, v_patch
  from public.versioning_parse_semver(p_semver)
  limit 1;

  v_tenant_id := public.current_usuario_tenant_id();
  if v_tenant_id is null then
    select id into v_tenant_id
    from public.tenants
    order by created_at asc
    limit 1;
  end if;

  select vp.id
    into v_product_id
  from public.version_products vp
  where vp.tenant_id = v_tenant_id
    and vp.product_key = p_product_key
  limit 1;

  if v_product_id is null then
    raise exception 'versioning_promote_release: product "%" not found', p_product_key using errcode = '22023';
  end if;

  select id into v_from_env_id
  from public.version_environments
  where tenant_id = v_tenant_id
    and env_key = p_from_env
  limit 1;

  select id into v_to_env_id
  from public.version_environments
  where tenant_id = v_tenant_id
    and env_key = p_to_env
  limit 1;

  if v_from_env_id is null or v_to_env_id is null then
    raise exception 'versioning_promote_release: env "%" or "%" not found', p_from_env, p_to_env using errcode = '22023';
  end if;

  select r.id
    into v_source_release_id
  from public.version_releases r
  where r.tenant_id = v_tenant_id
    and r.product_id = v_product_id
    and r.env_id = v_from_env_id
    and r.semver_major = v_major
    and r.semver_minor = v_minor
    and r.semver_patch = v_patch
    and r.prerelease_tag is null
  order by r.created_at desc
  limit 1;

  if v_source_release_id is null then
    raise exception 'versioning_promote_release: source release % (% -> %) not found', p_semver, p_from_env, p_to_env
      using errcode = '22023';
  end if;

  select r.id
    into v_target_release_id
  from public.version_releases r
  where r.tenant_id = v_tenant_id
    and r.product_id = v_product_id
    and r.env_id = v_to_env_id
    and r.semver_major = v_major
    and r.semver_minor = v_minor
    and r.semver_patch = v_patch
    and r.prerelease_tag is null
  limit 1;

  if v_target_release_id is null then
    insert into public.version_releases (
      tenant_id,
      product_id,
      env_id,
      semver_major,
      semver_minor,
      semver_patch,
      prerelease_tag,
      prerelease_no,
      status,
      source_changeset_id,
      source_commit_sha,
      created_by
    )
    select
      r.tenant_id,
      r.product_id,
      v_to_env_id,
      r.semver_major,
      r.semver_minor,
      r.semver_patch,
      null,
      null,
      'approved',
      r.source_changeset_id,
      r.source_commit_sha,
      coalesce(nullif(trim(p_actor), ''), 'admin')
    from public.version_releases r
    where r.id = v_source_release_id
    returning id into v_target_release_id;

    insert into public.version_release_components (
      tenant_id,
      release_id,
      component_id,
      component_revision_id
    )
    select
      rc.tenant_id,
      v_target_release_id,
      rc.component_id,
      rc.component_revision_id
    from public.version_release_components rc
    where rc.release_id = v_source_release_id;
  end if;

  insert into public.version_promotions (
    tenant_id,
    product_id,
    from_release_id,
    to_release_id,
    promoted_by,
    notes
  )
  values (
    v_tenant_id,
    v_product_id,
    v_source_release_id,
    v_target_release_id,
    coalesce(nullif(trim(p_actor), ''), 'admin'),
    p_notes
  );

  insert into public.version_audit_log (
    tenant_id,
    actor,
    action,
    entity_type,
    entity_id,
    payload
  )
  values (
    v_tenant_id,
    coalesce(nullif(trim(p_actor), ''), 'admin'),
    'promote_release',
    'version_releases',
    v_target_release_id::text,
    jsonb_build_object(
      'product_key', p_product_key,
      'from_env', p_from_env,
      'to_env', p_to_env,
      'semver', p_semver,
      'notes', p_notes
    )
  );

  return v_target_release_id;
end;
$$;

grant execute on function public.versioning_is_admin() to authenticated;
grant execute on function public.versioning_format_semver(integer, integer, integer) to authenticated;
grant execute on function public.versioning_parse_semver(text) to authenticated;
grant execute on function public.versioning_get_drift(text, text, text) to authenticated;
grant execute on function public.versioning_promote_release(text, text, text, text, text, text) to authenticated;

grant execute on function public.versioning_is_admin() to service_role;
grant execute on function public.versioning_format_semver(integer, integer, integer) to service_role;
grant execute on function public.versioning_parse_semver(text) to service_role;
grant execute on function public.versioning_get_drift(text, text, text) to service_role;
grant execute on function public.versioning_promote_release(text, text, text, text, text, text) to service_role;

grant select on public.version_releases_labeled to authenticated;
grant select on public.version_latest_releases to authenticated;
grant select on public.version_release_components_labeled to authenticated;
grant select on public.version_component_latest_revisions to authenticated;

grant select on public.version_releases_labeled to service_role;
grant select on public.version_latest_releases to service_role;
grant select on public.version_release_components_labeled to service_role;
grant select on public.version_component_latest_revisions to service_role;

grant select, insert, update, delete on public.version_products to authenticated;
grant select, insert, update, delete on public.version_environments to authenticated;
grant select, insert, update, delete on public.version_components to authenticated;
grant select, insert, update, delete on public.version_component_paths to authenticated;
grant select, insert, update, delete on public.version_component_dependencies to authenticated;
grant select, insert, update, delete on public.version_component_revisions to authenticated;
grant select, insert, update, delete on public.version_changesets to authenticated;
grant select, insert, update, delete on public.version_changeset_items to authenticated;
grant select, insert, update, delete on public.version_releases to authenticated;
grant select, insert, update, delete on public.version_release_components to authenticated;
grant select, insert, update, delete on public.version_promotions to authenticated;
grant select, insert, update, delete on public.version_deployments to authenticated;
grant select, insert, update, delete on public.version_audit_log to authenticated;

grant select, insert, update, delete on public.version_products to service_role;
grant select, insert, update, delete on public.version_environments to service_role;
grant select, insert, update, delete on public.version_components to service_role;
grant select, insert, update, delete on public.version_component_paths to service_role;
grant select, insert, update, delete on public.version_component_dependencies to service_role;
grant select, insert, update, delete on public.version_component_revisions to service_role;
grant select, insert, update, delete on public.version_changesets to service_role;
grant select, insert, update, delete on public.version_changeset_items to service_role;
grant select, insert, update, delete on public.version_releases to service_role;
grant select, insert, update, delete on public.version_release_components to service_role;
grant select, insert, update, delete on public.version_promotions to service_role;
grant select, insert, update, delete on public.version_deployments to service_role;
grant select, insert, update, delete on public.version_audit_log to service_role;

alter table public.version_products enable row level security;
alter table public.version_environments enable row level security;
alter table public.version_components enable row level security;
alter table public.version_component_paths enable row level security;
alter table public.version_component_dependencies enable row level security;
alter table public.version_component_revisions enable row level security;
alter table public.version_changesets enable row level security;
alter table public.version_changeset_items enable row level security;
alter table public.version_releases enable row level security;
alter table public.version_release_components enable row level security;
alter table public.version_promotions enable row level security;
alter table public.version_deployments enable row level security;
alter table public.version_audit_log enable row level security;

drop policy if exists version_products_admin_all on public.version_products;
create policy version_products_admin_all
  on public.version_products
  for all to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and public.versioning_is_admin()
  )
  with check (
    tenant_id = public.current_usuario_tenant_id()
    and public.versioning_is_admin()
  );

drop policy if exists version_environments_admin_all on public.version_environments;
create policy version_environments_admin_all
  on public.version_environments
  for all to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and public.versioning_is_admin()
  )
  with check (
    tenant_id = public.current_usuario_tenant_id()
    and public.versioning_is_admin()
  );

drop policy if exists version_components_admin_all on public.version_components;
create policy version_components_admin_all
  on public.version_components
  for all to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and public.versioning_is_admin()
  )
  with check (
    tenant_id = public.current_usuario_tenant_id()
    and public.versioning_is_admin()
  );

drop policy if exists version_component_paths_admin_all on public.version_component_paths;
create policy version_component_paths_admin_all
  on public.version_component_paths
  for all to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and public.versioning_is_admin()
  )
  with check (
    tenant_id = public.current_usuario_tenant_id()
    and public.versioning_is_admin()
  );

drop policy if exists version_component_dependencies_admin_all on public.version_component_dependencies;
create policy version_component_dependencies_admin_all
  on public.version_component_dependencies
  for all to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and public.versioning_is_admin()
  )
  with check (
    tenant_id = public.current_usuario_tenant_id()
    and public.versioning_is_admin()
  );

drop policy if exists version_component_revisions_admin_all on public.version_component_revisions;
create policy version_component_revisions_admin_all
  on public.version_component_revisions
  for all to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and public.versioning_is_admin()
  )
  with check (
    tenant_id = public.current_usuario_tenant_id()
    and public.versioning_is_admin()
  );

drop policy if exists version_changesets_admin_all on public.version_changesets;
create policy version_changesets_admin_all
  on public.version_changesets
  for all to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and public.versioning_is_admin()
  )
  with check (
    tenant_id = public.current_usuario_tenant_id()
    and public.versioning_is_admin()
  );

drop policy if exists version_changeset_items_admin_all on public.version_changeset_items;
create policy version_changeset_items_admin_all
  on public.version_changeset_items
  for all to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and public.versioning_is_admin()
  )
  with check (
    tenant_id = public.current_usuario_tenant_id()
    and public.versioning_is_admin()
  );

drop policy if exists version_releases_admin_all on public.version_releases;
create policy version_releases_admin_all
  on public.version_releases
  for all to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and public.versioning_is_admin()
  )
  with check (
    tenant_id = public.current_usuario_tenant_id()
    and public.versioning_is_admin()
  );

drop policy if exists version_release_components_admin_all on public.version_release_components;
create policy version_release_components_admin_all
  on public.version_release_components
  for all to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and public.versioning_is_admin()
  )
  with check (
    tenant_id = public.current_usuario_tenant_id()
    and public.versioning_is_admin()
  );

drop policy if exists version_promotions_admin_all on public.version_promotions;
create policy version_promotions_admin_all
  on public.version_promotions
  for all to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and public.versioning_is_admin()
  )
  with check (
    tenant_id = public.current_usuario_tenant_id()
    and public.versioning_is_admin()
  );

drop policy if exists version_deployments_admin_all on public.version_deployments;
create policy version_deployments_admin_all
  on public.version_deployments
  for all to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and public.versioning_is_admin()
  )
  with check (
    tenant_id = public.current_usuario_tenant_id()
    and public.versioning_is_admin()
  );

drop policy if exists version_audit_log_admin_all on public.version_audit_log;
create policy version_audit_log_admin_all
  on public.version_audit_log
  for all to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and public.versioning_is_admin()
  )
  with check (
    tenant_id = public.current_usuario_tenant_id()
    and public.versioning_is_admin()
  );

do $$
declare
  v_tenant_id uuid;
  v_product_id uuid;
  v_env_id uuid;
begin
  select t.id into v_tenant_id
  from public.tenants t
  where lower(t.name) = 'referidosapp'
  order by t.created_at asc
  limit 1;

  if v_tenant_id is null then
    select t.id into v_tenant_id
    from public.tenants t
    order by t.created_at asc
    limit 1;
  end if;

  if v_tenant_id is null then
    raise exception 'versioning seed failed: tenants table is empty';
  end if;

  insert into public.version_products (tenant_id, product_key, name, active, metadata)
  values
    (v_tenant_id, 'referidos_app', 'Referidos App', true, '{"channel":"pwa_web"}'::jsonb),
    (v_tenant_id, 'prelaunch_web', 'Prelaunch Web', true, '{"channel":"prelaunch_web"}'::jsonb),
    (v_tenant_id, 'android_app', 'Android App', true, '{"channel":"android"}'::jsonb)
  on conflict (tenant_id, product_key) do update
    set name = excluded.name,
        active = excluded.active,
        metadata = excluded.metadata,
        updated_at = now();

  insert into public.version_environments (tenant_id, env_key, name, active)
  values
    (v_tenant_id, 'dev', 'Desarrollo', true),
    (v_tenant_id, 'staging', 'Staging', true),
    (v_tenant_id, 'prod', 'Produccion', true)
  on conflict (tenant_id, env_key) do update
    set name = excluded.name,
        active = excluded.active,
        updated_at = now();

  for v_product_id in
    select p.id from public.version_products p where p.tenant_id = v_tenant_id
  loop
    for v_env_id in
      select e.id from public.version_environments e where e.tenant_id = v_tenant_id
    loop
      insert into public.version_releases (
        tenant_id,
        product_id,
        env_id,
        semver_major,
        semver_minor,
        semver_patch,
        prerelease_tag,
        prerelease_no,
        status,
        source_changeset_id,
        source_commit_sha,
        created_by
      )
      values (
        v_tenant_id,
        v_product_id,
        v_env_id,
        0,
        5,
        0,
        null,
        null,
        'deployed',
        null,
        'baseline-0.5.0',
        'system'
      )
      on conflict (
        tenant_id,
        product_id,
        env_id,
        semver_major,
        semver_minor,
        semver_patch,
        prerelease_tag,
        prerelease_no
      ) do nothing;
    end loop;
  end loop;
end;
$$;

commit;
