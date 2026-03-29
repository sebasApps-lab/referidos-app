begin;

create or replace function public.obs_resolve_user_display_name(
  p_user_id uuid,
  p_user_ref jsonb default '{}'::jsonb
)
returns text
language sql
stable
set search_path = public
as $$
  select coalesce(
    nullif(trim(concat_ws(' ', u.nombre, u.apellido)), ''),
    nullif(trim(u.nombre), ''),
    nullif(trim(p_user_ref->>'full_name'), ''),
    nullif(trim(p_user_ref->>'name'), ''),
    nullif(trim(p_user_ref#>>'{custom_claims,global_name}'), ''),
    nullif(trim(p_user_ref->>'global_name'), ''),
    nullif(trim(p_user_ref->>'slug'), ''),
    nullif(trim(u.public_id::text), ''),
    nullif(trim(p_user_ref->>'public_id'), ''),
    nullif(trim(u.email), ''),
    nullif(trim(p_user_ref->>'email'), ''),
    case when p_user_id is null then 'Anonimo' else null end,
    'Usuario'
  )
  from (select 1) seed
  left join public.usuarios u on u.id = p_user_id;
$$;

create or replace function public.obs_resolve_user_email(
  p_user_id uuid,
  p_user_ref jsonb default '{}'::jsonb
)
returns text
language sql
stable
set search_path = public
as $$
  select coalesce(
    nullif(trim(u.email), ''),
    nullif(trim(p_user_ref->>'email'), ''),
    nullif(trim(p_user_ref#>>'{user_metadata,email}'), ''),
    nullif(trim(p_user_ref#>>'{raw_user_meta_data,email}'), '')
  )
  from (select 1) seed
  left join public.usuarios u on u.id = p_user_id;
$$;

grant execute on function public.obs_resolve_user_display_name(uuid, jsonb) to authenticated;
grant execute on function public.obs_resolve_user_email(uuid, jsonb) to authenticated;

drop view if exists public.obs_events_context;
create view public.obs_events_context as
select
  e.*,
  public.obs_resolve_user_display_name(e.user_id, e.user_ref) as user_display_name,
  public.obs_resolve_user_email(e.user_id, e.user_ref) as user_email,
  coalesce(
    nullif(trim(u.public_id::text), ''),
    nullif(trim(e.user_ref->>'public_id'), ''),
    nullif(trim(e.user_ref#>>'{custom_claims,global_name}'), ''),
    nullif(trim(e.user_ref->>'slug'), '')
  ) as user_public_id_resolved
from public.obs_events e
left join public.usuarios u on u.id = e.user_id;

do $$
begin
  execute 'alter view public.obs_events_context set (security_invoker = true)';
exception
  when others then null;
end $$;

grant select on public.obs_events_context to authenticated;

drop view if exists public.obs_issues_context;
create view public.obs_issues_context as
select
  i.*,
  le.id as last_event_resolved_id,
  le.occurred_at as last_event_occurred_at,
  le.event_type as last_event_type,
  le.message as last_event_message,
  le.user_display_name as last_user_display_name,
  le.user_email as last_user_email,
  le.user_public_id_resolved as last_user_public_id,
  le.support_thread_id as last_support_thread_id,
  le.app_id as last_app_id,
  le.release_version_label as last_release_version_label,
  le.release_build_number as last_release_build_number,
  le.release_artifact_id as last_release_artifact_id,
  le.release_channel as last_release_channel,
  le.release_source_commit_sha as last_release_source_commit_sha
from public.obs_issues i
left join lateral (
  select ec.*
  from public.obs_events_context ec
  where ec.issue_id = i.id
    and ec.tenant_id = i.tenant_id
  order by ec.occurred_at desc, ec.created_at desc
  limit 1
) le on true;

do $$
begin
  execute 'alter view public.obs_issues_context set (security_invoker = true)';
exception
  when others then null;
end $$;

grant select on public.obs_issues_context to authenticated;

drop view if exists public.support_ticket_obs_context;
create view public.support_ticket_obs_context as
select
  t.id as thread_id,
  t.public_id as thread_public_id,
  t.request_origin,
  t.origin_source,
  t.app_channel,
  t.category,
  t.severity,
  t.status as thread_status,
  t.summary,
  t.context as thread_context,
  t.client_request_id,
  t.personal_queue,
  t.created_at as thread_created_at,
  t.updated_at as thread_updated_at,
  t.closed_at as thread_closed_at,
  t.cancelled_at as thread_cancelled_at,
  t.user_id as thread_user_id,
  t.user_public_id as thread_user_public_id,
  t.anon_profile_id,
  a.public_id as anon_public_id,
  a.display_name as anon_display_name,
  a.contact_channel as anon_contact_channel,
  public.mask_support_contact(a.contact_channel, a.contact_value) as anon_contact_display,
  oe.id as obs_event_id,
  oe.occurred_at as obs_occurred_at,
  oe.event_type as obs_event_type,
  oe.level as obs_level,
  oe.message as obs_message,
  oe.issue_id as obs_issue_id,
  oi.title as obs_issue_title,
  oi.level as obs_issue_level,
  oe.request_id as obs_request_id,
  oe.trace_id as obs_trace_id,
  oe.session_id as obs_session_id,
  oe.user_id as obs_user_id,
  oe.auth_user_id as obs_auth_user_id,
  coalesce(
    oe.user_display_name,
    public.obs_resolve_user_display_name(t.user_id, '{}'::jsonb),
    a.display_name,
    t.user_public_id
  ) as user_display_name,
  coalesce(
    oe.user_email,
    public.obs_resolve_user_email(t.user_id, '{}'::jsonb)
  ) as user_email,
  coalesce(
    oe.user_public_id_resolved,
    t.user_public_id,
    a.public_id
  ) as user_public_id_resolved,
  coalesce(
    oe.release_version_label,
    nullif(trim(t.context#>>'{build,version_label}'), ''),
    nullif(trim(t.context#>>'{runtime,app_version}'), ''),
    nullif(trim(t.context->>'app_version'), '')
  ) as release_version_label,
  coalesce(
    oe.release_build_number,
    case
      when coalesce(t.context#>>'{build,build_number}', '') ~ '^[0-9]+$'
        then (t.context#>>'{build,build_number}')::bigint
      when coalesce(t.context->>'build_number', '') ~ '^[0-9]+$'
        then (t.context->>'build_number')::bigint
      else null
    end
  ) as release_build_number,
  coalesce(
    nullif(trim(oe.release_artifact_id), ''),
    nullif(trim(t.context#>>'{build,artifact_id}'), ''),
    nullif(trim(t.context->>'artifact_id'), '')
  ) as release_artifact_id,
  coalesce(
    nullif(trim(oe.release_channel), ''),
    nullif(trim(t.context#>>'{build,release_channel}'), ''),
    nullif(trim(t.context->>'release_channel'), '')
  ) as release_channel,
  coalesce(
    nullif(trim(oe.release_source_commit_sha), ''),
    nullif(trim(t.context#>>'{build,source_commit_sha}'), ''),
    nullif(trim(t.context->>'source_commit_sha'), '')
  ) as release_source_commit_sha
from public.support_threads t
left join public.anon_support_profiles a on a.id = t.anon_profile_id
left join lateral (
  select ec.*
  from public.obs_events_context ec
  where (
      ec.support_thread_id = t.id
      or (
        ec.support_thread_id is null
        and t.client_request_id is not null
        and ec.request_id = t.client_request_id
      )
    )
    and (
      t.user_id is null
      or ec.user_id is null
      or ec.user_id = t.user_id
    )
  order by
    case when ec.support_thread_id = t.id then 0 else 1 end,
    ec.occurred_at desc,
    ec.created_at desc
  limit 1
) oe on true
left join public.obs_issues oi on oi.id = oe.issue_id;

do $$
begin
  execute 'alter view public.support_ticket_obs_context set (security_invoker = true)';
exception
  when others then null;
end $$;

grant select on public.support_ticket_obs_context to authenticated;

commit;
