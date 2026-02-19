-- 20260226_000019_versioning_bootstrap_release_cleanup.sql
-- Remove seeded/bootstrap baseline releases and normalize dev statuses.

begin;

drop trigger if exists trg_version_releases_guard_dev_status on public.version_releases;
drop function if exists public.versioning_guard_dev_release_status();

create temporary table tmp_version_seed_release_ids (
  id uuid primary key
) on commit drop;

insert into tmp_version_seed_release_ids (id)
select r.id
from public.version_releases r
where r.source_changeset_id is null
  and r.prerelease_tag is null
  and lower(coalesce(r.created_by, '')) in ('system', 'bootstrap')
  and lower(coalesce(r.source_commit_sha, '')) like 'baseline-%'
  and not exists (
    select 1
    from public.version_promotions p
    where p.from_release_id = r.id
       or p.to_release_id = r.id
  )
  and not exists (
    select 1
    from public.version_deployments d
    where d.release_id = r.id
  )
  and not exists (
    select 1
    from public.version_deploy_requests dr
    where dr.release_id = r.id
  );

delete from public.version_release_components rc
where rc.release_id in (select id from tmp_version_seed_release_ids);

delete from public.version_releases r
where r.id in (select id from tmp_version_seed_release_ids);

update public.version_releases r
set
  status = 'validated',
  updated_at = now()
from public.version_environments e
where e.id = r.env_id
  and e.tenant_id = r.tenant_id
  and e.env_key = 'dev'
  and r.status in ('approved', 'deployed');

commit;
