begin;

insert into storage.buckets (id, name, public)
values ('versioning-artifacts', 'versioning-artifacts', false)
on conflict (id) do update
set
  name = excluded.name,
  public = false;

create index if not exists idx_version_release_artifacts_tenant_product_semver_created
  on public.version_release_artifacts (tenant_id, product_id, semver, created_at desc);

create or replace function public.versioning_mark_env_artifact_head(
  p_release_id uuid,
  p_actor text default 'system'
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_release record;
  v_artifact_id uuid;
  v_actor text;
  v_semver_label text;
begin
  if auth.uid() is not null and not public.versioning_is_admin() and coalesce(auth.role(), '') <> 'service_role' then
    raise exception 'versioning_mark_env_artifact_head: forbidden' using errcode = '42501';
  end if;

  v_actor := coalesce(nullif(trim(p_actor), ''), 'system');

  select
    r.id,
    r.tenant_id,
    r.product_id,
    r.env_id,
    r.semver_major,
    r.semver_minor,
    r.semver_patch
  into v_release
  from public.version_releases r
  where r.id = p_release_id
  for update;

  if not found then
    raise exception 'versioning_mark_env_artifact_head: release % not found', p_release_id using errcode = '22023';
  end if;

  v_semver_label := public.versioning_format_semver(
    v_release.semver_major,
    v_release.semver_minor,
    v_release.semver_patch
  );

  -- Preferred path: exact release artifact row.
  select a.id
    into v_artifact_id
  from public.version_release_artifacts a
  where a.release_id = v_release.id
  limit 1;

  -- Fallback path: shared artifact by tenant/product/semver.
  if v_artifact_id is null then
    select a.id
      into v_artifact_id
    from public.version_release_artifacts a
    where a.tenant_id = v_release.tenant_id
      and a.product_id = v_release.product_id
      and a.semver = v_semver_label
    order by a.created_at desc
    limit 1;
  end if;

  if v_artifact_id is null then
    raise exception 'versioning_mark_env_artifact_head: artifact not found for release %, semver %', p_release_id, v_semver_label using errcode = '22023';
  end if;

  insert into public.version_artifact_env_heads (
    tenant_id,
    product_id,
    env_id,
    release_id,
    artifact_id,
    updated_by,
    updated_at
  )
  values (
    v_release.tenant_id,
    v_release.product_id,
    v_release.env_id,
    v_release.id,
    v_artifact_id,
    v_actor,
    now()
  )
  on conflict (tenant_id, product_id, env_id)
  do update
    set release_id = excluded.release_id,
        artifact_id = excluded.artifact_id,
        updated_by = excluded.updated_by,
        updated_at = now();

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
    'mark_env_artifact_head',
    'version_artifact_env_heads',
    v_artifact_id::text,
    jsonb_build_object(
      'release_id', v_release.id,
      'env_id', v_release.env_id,
      'semver', v_semver_label
    )
  );

  return v_artifact_id;
end;
$$;

commit;
