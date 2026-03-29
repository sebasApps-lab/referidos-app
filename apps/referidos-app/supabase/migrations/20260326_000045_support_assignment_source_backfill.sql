-- 20260326_000045_support_assignment_source_backfill.sql
-- Normaliza assignment_source para cola general no asignada.
-- Evita que tickets liberados por sesion/quiebre operativo queden bloqueados como general_retake.

with latest_release_event as (
  select distinct on (e.thread_id)
    e.thread_id,
    e.event_type::text as event_type,
    coalesce(e.details->>'reason', '') as reason
  from public.support_thread_events e
  where e.event_type::text in ('retake_requested', 'agent_timeout_release', 'agent_manual_release')
  order by e.thread_id, e.created_at desc
)
update public.support_threads t
set
  assignment_source = case
    when t.retake_requested_at is not null then 'general_retake'
    when lr.event_type = 'retake_requested' then 'general_retake'
    when lr.event_type = 'agent_timeout_release' and lr.reason = 'personal_queue_timeout' then 'general_retake'
    when lr.event_type = 'agent_timeout_release' then 'system'
    when lr.event_type = 'agent_manual_release' and lr.reason in ('agent_session_end', 'admin_session_end') then 'system'
    when lr.event_type = 'agent_manual_release' then 'manual'
    else t.assignment_source
  end,
  updated_at = now()
from latest_release_event lr
where t.id = lr.thread_id
  and t.status = 'queued'
  and t.personal_queue = false
  and t.assigned_agent_id is null;

update public.support_threads t
set
  assignment_source = case
    when t.retake_requested_at is not null then 'general_retake'
    when t.assignment_source = 'general_retake' then 'general_retake'
    when t.released_to_general_at is not null then 'system'
    else t.assignment_source
  end,
  updated_at = now()
where t.status = 'queued'
  and t.personal_queue = false
  and t.assigned_agent_id is null;
