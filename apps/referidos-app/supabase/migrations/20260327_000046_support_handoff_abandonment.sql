-- 20260327_000046_support_handoff_abandonment.sql
-- Marca de abandono de ticket al cerrar jornada y exposicion en vistas de soporte.

begin;

alter table public.support_threads
  add column if not exists handoff_required boolean not null default false,
  add column if not exists handoff_reason text,
  add column if not exists handoff_at timestamptz,
  add column if not exists handoff_by_agent_id uuid references public.usuarios(id) on delete set null,
  add column if not exists handoff_message_confirmed_at timestamptz;

update public.support_threads
set
  handoff_required = (
    coalesce(handoff_required, false)
    or handoff_reason is not null
    or handoff_at is not null
    or handoff_by_agent_id is not null
    or handoff_message_confirmed_at is not null
  ),
  handoff_reason = case
    when (
      coalesce(handoff_required, false)
      or handoff_reason is not null
      or handoff_at is not null
      or handoff_by_agent_id is not null
      or handoff_message_confirmed_at is not null
    )
      then coalesce(nullif(handoff_reason, ''), 'agent_abandonment')
    else null
  end,
  handoff_at = case
    when (
      coalesce(handoff_required, false)
      or handoff_reason is not null
      or handoff_at is not null
      or handoff_by_agent_id is not null
      or handoff_message_confirmed_at is not null
    )
      then coalesce(handoff_at, updated_at, created_at, now())
    else null
  end,
  handoff_message_confirmed_at = case
    when (
      coalesce(handoff_required, false)
      or handoff_reason is not null
      or handoff_at is not null
      or handoff_by_agent_id is not null
      or handoff_message_confirmed_at is not null
    )
      then coalesce(handoff_message_confirmed_at, handoff_at, updated_at, created_at, now())
    else null
  end;

alter table public.support_threads
  drop constraint if exists support_threads_handoff_consistency_check;

alter table public.support_threads
  add constraint support_threads_handoff_consistency_check
  check (
    (handoff_required = false and handoff_reason is null and handoff_at is null and handoff_by_agent_id is null and handoff_message_confirmed_at is null)
    or
    (handoff_required = true and handoff_reason is not null and handoff_at is not null)
  );

with latest_abandonment as (
  select distinct on (e.thread_id)
    e.thread_id,
    e.created_at,
    e.actor_id::text as actor_id_text
  from public.support_thread_events e
  where e.event_type::text = 'agent_manual_release'
    and coalesce(e.details->>'reason', '') = 'agent_abandon_confirmed'
  order by e.thread_id, e.created_at desc
)
update public.support_threads t
set
  handoff_required = true,
  handoff_reason = coalesce(nullif(t.handoff_reason, ''), 'agent_abandonment'),
  handoff_at = coalesce(t.handoff_at, latest_abandonment.created_at),
  handoff_by_agent_id = coalesce(
    t.handoff_by_agent_id,
    case
      when trim(coalesce(latest_abandonment.actor_id_text, '')) ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
        then latest_abandonment.actor_id_text::uuid
      else null
    end
  ),
  handoff_message_confirmed_at = coalesce(t.handoff_message_confirmed_at, latest_abandonment.created_at),
  updated_at = now()
from latest_abandonment
where t.id = latest_abandonment.thread_id
  and t.status = 'queued'
  and t.assigned_agent_id is null;

drop view if exists public.support_threads_public;
create view public.support_threads_public
as
select
  public_id,
  user_public_id,
  category,
  severity,
  status,
  summary,
  assigned_agent_phone,
  wa_message_text,
  wa_link,
  resolution,
  created_at,
  closed_at,
  cancelled_at,
  request_origin,
  origin_source,
  app_channel,
  personal_queue,
  retake_requested_at,
  released_to_general_at,
  general_queue_entered_at,
  handoff_required,
  handoff_reason,
  handoff_at,
  handoff_by_agent_id,
  handoff_message_confirmed_at
from public.support_threads;

do $$
begin
  execute 'alter view public.support_threads_public set (security_invoker = true)';
exception
  when others then
    null;
end $$;

grant select on public.support_threads_public to authenticated;

drop view if exists public.support_threads_inbox;
create view public.support_threads_inbox
as
select
  t.public_id,
  t.category,
  t.severity,
  t.status,
  t.summary,
  t.created_at,
  t.updated_at,
  t.assigned_agent_id,
  t.created_by_agent_id,
  t.assigned_agent_phone,
  t.user_public_id,
  t.request_origin,
  t.origin_source,
  t.is_anonymous,
  t.personal_queue,
  t.anon_profile_id,
  t.assignment_source,
  t.assigned_at,
  t.starting_at,
  t.retake_requested_at,
  t.released_to_general_at,
  t.general_queue_entered_at,
  t.app_channel,
  t.handoff_required,
  t.handoff_reason,
  t.handoff_at,
  t.handoff_by_agent_id,
  t.handoff_message_confirmed_at,
  a.public_id as anon_public_id,
  a.display_name as anon_display_name,
  a.contact_channel as anon_contact_channel,
  public.mask_support_contact(a.contact_channel, a.contact_value) as contact_display,
  case
    when t.request_origin = 'anonymous' then array['anonymous', t.category::text, t.severity::text]
    else array['registered', t.category::text, t.severity::text]
  end as routing_tags
from public.support_threads t
left join public.anon_support_profiles a on a.id = t.anon_profile_id;

do $$
begin
  execute 'alter view public.support_threads_inbox set (security_invoker = true)';
exception
  when others then
    null;
end $$;

grant select on public.support_threads_inbox to authenticated;

commit;
