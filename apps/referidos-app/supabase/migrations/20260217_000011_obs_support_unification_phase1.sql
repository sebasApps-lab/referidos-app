-- 20260217_000011_obs_support_unification_phase1.sql
-- Unifica logs soporte en obs_events como fuente unica.
-- Crea vista support_log_events, backfill legacy y retencion por tier.

begin;

alter table public.obs_events
  add column if not exists event_domain text default 'observability',
  add column if not exists support_category text,
  add column if not exists support_thread_id uuid references public.support_threads(id) on delete set null,
  add column if not exists support_route text,
  add column if not exists support_screen text,
  add column if not exists support_flow text,
  add column if not exists support_flow_step text,
  add column if not exists support_context_extra jsonb default '{}'::jsonb,
  add column if not exists support_received_at timestamptz,
  add column if not exists retention_tier text default 'long',
  add column if not exists retention_expires_at timestamptz;

update public.obs_events
set event_domain = coalesce(event_domain, 'observability');

update public.obs_events
set retention_tier = coalesce(retention_tier, 'long');

update public.obs_events
set retention_expires_at = coalesce(
  retention_expires_at,
  occurred_at + case
    when retention_tier = 'short' then interval '7 days'
    else interval '30 days'
  end
);

alter table public.obs_events
  alter column issue_id drop not null;

alter table public.obs_events
  alter column event_domain set not null;

alter table public.obs_events
  alter column retention_tier set not null;

alter table public.obs_events
  alter column retention_expires_at set not null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'obs_events_event_domain_check'
  ) then
    alter table public.obs_events
      add constraint obs_events_event_domain_check
      check (event_domain in ('observability', 'support'));
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'obs_events_retention_tier_check'
  ) then
    alter table public.obs_events
      add constraint obs_events_retention_tier_check
      check (retention_tier in ('long', 'short'));
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'obs_events_issue_support_domain_check'
  ) then
    alter table public.obs_events
      add constraint obs_events_issue_support_domain_check
      check (
        (event_domain = 'support' and issue_id is null)
        or
        (event_domain <> 'support' and issue_id is not null)
      );
  end if;
end $$;

create index if not exists idx_obs_events_tenant_domain_occurred
  on public.obs_events (tenant_id, event_domain, occurred_at desc);

create index if not exists idx_obs_events_tenant_domain_user_occurred
  on public.obs_events (tenant_id, user_id, occurred_at desc)
  where event_domain = 'support';

create index if not exists idx_obs_events_tenant_domain_thread_occurred
  on public.obs_events (tenant_id, support_thread_id, occurred_at desc)
  where event_domain = 'support';

create index if not exists idx_obs_events_tenant_domain_category_occurred
  on public.obs_events (tenant_id, support_category, occurred_at desc)
  where event_domain = 'support';

create index if not exists idx_obs_events_retention_expires
  on public.obs_events (retention_expires_at);

create or replace view public.support_log_events as
select
  e.id,
  e.tenant_id,
  e.user_id,
  e.auth_user_id,
  e.level,
  coalesce(e.support_category, nullif(trim(e.context->>'category'), '')) as category,
  e.event_type,
  e.message,
  e.request_id,
  e.trace_id,
  e.session_id,
  coalesce(e.support_route, nullif(trim(e.context->>'route'), '')) as route,
  coalesce(e.support_screen, nullif(trim(e.context->>'screen'), '')) as screen,
  coalesce(e.support_flow, nullif(trim(e.context->>'flow'), '')) as flow,
  coalesce(e.support_flow_step, nullif(trim(e.context->>'flow_step'), '')) as flow_step,
  e.support_thread_id as thread_id,
  e.context,
  coalesce(
    e.support_context_extra,
    case
      when jsonb_typeof(e.context->'extra') = 'object' then e.context->'extra'
      else '{}'::jsonb
    end
  ) as context_extra,
  e.device,
  e.release,
  e.user_ref,
  e.ip_hash,
  e.app_id,
  e.source,
  e.occurred_at,
  e.created_at,
  e.support_received_at,
  e.retention_tier,
  e.retention_expires_at
from public.obs_events e
where e.event_domain = 'support';

do $$
begin
  execute 'alter view public.support_log_events set (security_invoker = true)';
exception
  when others then
    null;
end $$;

grant select on public.support_log_events to authenticated;
revoke all on public.support_log_events from anon;

insert into public.obs_events (
  tenant_id,
  issue_id,
  occurred_at,
  level,
  event_type,
  source,
  message,
  error_code,
  stack_preview,
  stack_raw,
  stack_frames_raw,
  fingerprint,
  context,
  breadcrumbs,
  release,
  device,
  user_ref,
  request_id,
  trace_id,
  session_id,
  ip_hash,
  app_id,
  user_id,
  auth_user_id,
  event_domain,
  support_category,
  support_thread_id,
  support_route,
  support_screen,
  support_flow,
  support_flow_step,
  support_context_extra,
  support_received_at,
  retention_tier,
  retention_expires_at,
  created_at
)
select
  u.tenant_id,
  null,
  coalesce(s.created_at, now()),
  case
    when s.level::text in ('fatal', 'error', 'warn', 'info', 'debug') then s.level::text
    else 'info'
  end,
  case
    when s.category::text = 'performance' then 'performance'
    else 'log'
  end,
  'web',
  coalesce(nullif(trim(s.message::text), ''), 'support_log'),
  null,
  null,
  case
    when jsonb_typeof(s.context) = 'object' and s.context ? 'stack' then left(s.context->>'stack', 20000)
    else null
  end,
  case
    when jsonb_typeof(s.context) = 'object' and jsonb_typeof(s.context->'stack_frames_raw') = 'array'
      then s.context->'stack_frames_raw'
    else '[]'::jsonb
  end,
  coalesce(
    nullif(trim(s.fingerprint), ''),
    encode(
      extensions.digest(
        convert_to(
          lower(
            regexp_replace(
              coalesce(s.category::text, '') || '|' ||
              coalesce(s.route, '') || '|' ||
              coalesce(s.message::text, ''),
              '\d+',
              '0',
              'g'
            )
          ),
          'UTF8'
        ),
        'sha256'
      ),
      'hex'
    )
  ),
  (
    coalesce(
      case
        when jsonb_typeof(s.context) = 'object' then s.context
        else '{}'::jsonb
      end,
      '{}'::jsonb
    ) ||
    jsonb_build_object(
      'legacy_support_log_id', s.id::text,
      'legacy_source', 'support_user_logs',
      'extra',
      coalesce(
        case
          when jsonb_typeof(s.context_extra) = 'object' then s.context_extra
          else '{}'::jsonb
        end,
        '{}'::jsonb
      )
    )
  ),
  '[]'::jsonb,
  jsonb_strip_nulls(
    jsonb_build_object(
      'app_version', s.app_version
    )
  ),
  jsonb_strip_nulls(
    jsonb_build_object(
      'device', s.device,
      'network', s.network,
      'user_agent', s.user_agent
    )
  ),
  jsonb_strip_nulls(
    jsonb_build_object(
      'user_id', u.id,
      'public_user_id', u.public_id,
      'role', coalesce(s.role::text, u.role)
    )
  ),
  s.request_id,
  null,
  s.session_id,
  s.ip_hash,
  coalesce(
    nullif(trim(
      case
        when jsonb_typeof(s.context) = 'object' then coalesce(s.context->>'app_id', '')
        else ''
      end
    ), ''),
    'referidos-app'
  ),
  u.id,
  u.id_auth,
  'support',
  s.category::text,
  s.thread_id,
  s.route,
  s.screen,
  s.flow,
  s.flow_step,
  coalesce(
    case
      when jsonb_typeof(s.context_extra) = 'object' then s.context_extra
      else '{}'::jsonb
    end,
    '{}'::jsonb
  ),
  coalesce(s.received_at, s.created_at, now()),
  'long',
  coalesce(s.created_at, now()) + interval '30 days',
  coalesce(s.created_at, now())
from public.support_user_logs s
join public.usuarios u
  on u.id::text = s.user_id::text
left join public.obs_events e
  on e.context->>'legacy_support_log_id' = s.id::text
where e.id is null;

create or replace function public.obs_cleanup(
  p_tenant_id uuid default null,
  p_events_days integer default 30,
  p_resolved_days integer default 90
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  deleted_attachments bigint := 0;
  deleted_events bigint := 0;
  deleted_issues bigint := 0;
  cleared_symbolication_cache bigint := 0;
begin
  update public.obs_events e
  set
    symbolicated_stack = null,
    symbolicated_at = null,
    symbolicated_by = null,
    symbolication_release = null,
    symbolication_status = null,
    symbolication_type = null
  where (p_tenant_id is null or e.tenant_id = p_tenant_id)
    and e.symbolicated_at is not null
    and (
      (coalesce(e.symbolication_type, 'short') = 'short' and e.symbolicated_at < now() - interval '2 days')
      or
      (e.symbolication_type = 'long' and e.symbolicated_at < now() - interval '30 days')
    );
  get diagnostics cleared_symbolication_cache = row_count;

  delete from public.obs_event_attachments a
  using public.obs_events e
  where a.event_id = e.id
    and (p_tenant_id is null or e.tenant_id = p_tenant_id)
    and (
      e.retention_expires_at < now()
      or
      (e.retention_expires_at is null and e.occurred_at < now() - make_interval(days => p_events_days))
    );
  get diagnostics deleted_attachments = row_count;

  delete from public.obs_events e
  where (p_tenant_id is null or e.tenant_id = p_tenant_id)
    and (
      e.retention_expires_at < now()
      or
      (e.retention_expires_at is null and e.occurred_at < now() - make_interval(days => p_events_days))
    );
  get diagnostics deleted_events = row_count;

  delete from public.obs_issues i
  where (p_tenant_id is null or i.tenant_id = p_tenant_id)
    and i.status in ('resolved', 'ignored')
    and i.last_seen_at < now() - make_interval(days => p_resolved_days)
    and not exists (
      select 1
      from public.obs_events e
      where e.issue_id = i.id
    );
  get diagnostics deleted_issues = row_count;

  return jsonb_build_object(
    'cleared_symbolication_cache', cleared_symbolication_cache,
    'deleted_attachments', deleted_attachments,
    'deleted_events', deleted_events,
    'deleted_issues', deleted_issues
  );
end;
$$;

revoke all on function public.obs_cleanup(uuid, integer, integer)
from public, anon, authenticated;
grant execute on function public.obs_cleanup(uuid, integer, integer)
to service_role;

commit;
