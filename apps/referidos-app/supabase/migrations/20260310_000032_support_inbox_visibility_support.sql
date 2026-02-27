-- 20260310_000032_support_inbox_visibility_support.sql
-- Visibilidad por estado para inbox de soporte:
-- - admin: todo
-- - soporte:
--   assigned/in_progress/waiting_user -> solo asignados al asesor
--   new -> todos sin asignar
--   queued -> todos
--   closed -> solo cerrados por el asesor (evento closed actor_id = asesor)

begin;

create or replace function public.support_thread_closed_by_actor(
  p_thread_id uuid,
  p_actor_id text
)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.support_thread_events ev
    where ev.thread_id = p_thread_id
      and ev.event_type = 'closed'
      and ev.actor_id::text = p_actor_id::text
  );
$$;

grant execute on function public.support_thread_closed_by_actor(uuid, text) to authenticated;

drop policy if exists support_threads_select on public.support_threads;
create policy support_threads_select on public.support_threads
  for select to authenticated
  using (
    exists (
      select 1
      from public.usuarios u
      where u.id_auth = auth.uid()
        and (
          u.id = support_threads.user_id
          or u.role = 'admin'
          or (
            u.role = 'soporte'
            and (
              (
                support_threads.status in ('assigned', 'in_progress', 'waiting_user')
                and support_threads.assigned_agent_id = u.id
              )
              or (
                support_threads.status = 'new'
                and support_threads.assigned_agent_id is null
              )
              or (
                support_threads.status = 'queued'
                and (
                  support_threads.assigned_agent_id is null
                  or support_threads.assigned_agent_id = u.id
                )
              )
              or (
                support_threads.status = 'closed'
                and public.support_thread_closed_by_actor(support_threads.id, u.id::text)
              )
            )
          )
        )
    )
  );

drop policy if exists support_thread_events_select on public.support_thread_events;
create policy support_thread_events_select on public.support_thread_events
  for select to authenticated
  using (
    exists (
      select 1
      from public.support_threads t
      join public.usuarios u on u.id_auth = auth.uid()
      where t.id = support_thread_events.thread_id
        and (
          t.user_id = u.id
          or u.role = 'admin'
          or (
            u.role = 'soporte'
            and (
              (
                t.status in ('assigned', 'in_progress', 'waiting_user')
                and t.assigned_agent_id = u.id
              )
              or (
                t.status = 'new'
                and t.assigned_agent_id is null
              )
              or (
                t.status = 'queued'
                and (
                  t.assigned_agent_id is null
                  or t.assigned_agent_id = u.id
                )
              )
              or (
                t.status = 'closed'
                and public.support_thread_closed_by_actor(t.id, u.id::text)
              )
            )
          )
        )
    )
  );

drop policy if exists support_thread_notes_select on public.support_thread_notes;
create policy support_thread_notes_select on public.support_thread_notes
  for select to authenticated
  using (
    exists (
      select 1
      from public.support_threads t
      join public.usuarios u on u.id_auth = auth.uid()
      where t.id = support_thread_notes.thread_id
        and (
          u.role = 'admin'
          or (
            u.role = 'soporte'
            and (
              (
                t.status in ('assigned', 'in_progress', 'waiting_user')
                and t.assigned_agent_id = u.id
              )
              or (
                t.status = 'new'
                and t.assigned_agent_id is null
              )
              or (
                t.status = 'queued'
                and (
                  t.assigned_agent_id is null
                  or t.assigned_agent_id = u.id
                )
              )
              or (
                t.status = 'closed'
                and public.support_thread_closed_by_actor(t.id, u.id::text)
              )
            )
          )
        )
    )
  );

create or replace function public.obs_support_can_access_thread(p_thread_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.support_threads t
    join public.usuarios u on u.id_auth = auth.uid()
    where t.id = p_thread_id
      and u.role = 'soporte'
      and (
        (
          t.status in ('assigned', 'in_progress', 'waiting_user')
          and t.assigned_agent_id = u.id
        )
        or (
          t.status = 'new'
          and t.assigned_agent_id is null
        )
        or (
          t.status = 'queued'
          and (
            t.assigned_agent_id is null
            or t.assigned_agent_id = u.id
          )
        )
        or (
          t.status = 'closed'
          and public.support_thread_closed_by_actor(t.id, u.id::text)
        )
      )
  );
$$;

grant execute on function public.obs_support_can_access_thread(uuid) to authenticated;

commit;
