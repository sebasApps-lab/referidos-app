-- 20260222_000017_versioning_request_deploy_env_guard.sql
-- Restrict deploy requests to staging/prod only.

begin;

create or replace function public.versioning_request_deploy(
  p_product_key text,
  p_env_key text,
  p_semver text,
  p_actor text default 'admin-ui',
  p_notes text default null,
  p_metadata jsonb default '{}'::jsonb
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_tenant_id uuid;
  v_product_id uuid;
  v_env_id uuid;
  v_release_id uuid;
  v_major integer;
  v_minor integer;
  v_patch integer;
  v_actor text;
  v_request_id uuid;
  v_env_key text;
begin
  if auth.uid() is not null and not public.versioning_is_admin() then
    raise exception 'versioning_request_deploy: forbidden' using errcode = '42501';
  end if;

  v_actor := coalesce(nullif(trim(p_actor), ''), 'admin-ui');
  v_env_key := lower(trim(coalesce(p_env_key, '')));

  if v_env_key not in ('staging', 'prod') then
    raise exception 'versioning_request_deploy: env "%" is not deployable (allowed: staging|prod)', v_env_key
      using errcode = '22023';
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

  select id
    into v_product_id
  from public.version_products
  where tenant_id = v_tenant_id
    and product_key = p_product_key
  limit 1;

  select id
    into v_env_id
  from public.version_environments
  where tenant_id = v_tenant_id
    and env_key = v_env_key
  limit 1;

  if v_product_id is null or v_env_id is null then
    raise exception 'versioning_request_deploy: product/env invalid (% / %)', p_product_key, v_env_key
      using errcode = '22023';
  end if;

  select id
    into v_release_id
  from public.version_releases
  where tenant_id = v_tenant_id
    and product_id = v_product_id
    and env_id = v_env_id
    and semver_major = v_major
    and semver_minor = v_minor
    and semver_patch = v_patch
    and prerelease_tag is null
  order by created_at desc
  limit 1;

  if v_release_id is null then
    raise exception 'versioning_request_deploy: release % not found for %/%', p_semver, p_product_key, v_env_key
      using errcode = '22023';
  end if;

  insert into public.version_deploy_requests (
    tenant_id,
    product_id,
    env_id,
    release_id,
    status,
    requested_by,
    requested_by_actor_uuid,
    notes,
    metadata
  )
  values (
    v_tenant_id,
    v_product_id,
    v_env_id,
    v_release_id,
    'pending',
    v_actor,
    auth.uid(),
    p_notes,
    coalesce(p_metadata, '{}'::jsonb)
  )
  returning id into v_request_id;

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
    v_actor,
    'request_deploy',
    'version_deploy_requests',
    v_request_id::text,
    jsonb_build_object(
      'product_key', p_product_key,
      'env_key', v_env_key,
      'semver', p_semver,
      'notes', p_notes
    )
  );

  return v_request_id;
end;
$$;

commit;

