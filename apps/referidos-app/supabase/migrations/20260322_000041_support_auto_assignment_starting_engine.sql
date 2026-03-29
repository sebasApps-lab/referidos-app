-- 20260322_000041_support_auto_assignment_starting_engine.sql
-- Motor de auto-asignacion de soporte, estado starting y configuracion de tiempos.

begin;

do $$
begin
  begin
    alter type public.support_thread_status add value 'starting';
  exception
    when duplicate_object then null;
  end;

  begin
    alter type public.support_event_type add value 'starting';
  exception
    when duplicate_object then null;
  end;

  begin
    alter type public.support_event_type add value 'retake_requested';
  exception
    when duplicate_object then null;
  end;
end $$;

alter table public.support_threads
  add column if not exists tenant_id uuid references public.tenants(id) on delete cascade,
  add column if not exists assignment_source text not null default 'manual',
  add column if not exists assigned_at timestamptz,
  add column if not exists starting_at timestamptz,
  add column if not exists in_progress_at timestamptz,
  add column if not exists waiting_user_at timestamptz,
  add column if not exists personal_queue_entered_at timestamptz,
  add column if not exists general_queue_entered_at timestamptz,
  add column if not exists released_to_general_at timestamptz,
  add column if not exists retake_requested_at timestamptz,
  add column if not exists opening_message_sent_at timestamptz,
  add column if not exists opening_message_actor_id uuid references public.usuarios(id) on delete set null;

update public.support_threads
set tenant_id = coalesce(tenant_id, public.resolve_default_tenant_id())
where tenant_id is null;

alter table public.support_threads
  alter column tenant_id set default coalesce(public.current_usuario_tenant_id(), public.resolve_default_tenant_id());

update public.support_threads
set assignment_source = case
  when irregular = true then 'irregular'
  when status = 'new' and assigned_agent_id is null then 'new_auto'
  when status = 'queued' and personal_queue = false then 'general_retake'
  else 'manual'
end
where assignment_source is null
   or length(trim(assignment_source)) = 0;

update public.support_threads
set assigned_at = created_at
where assigned_at is null
  and assigned_agent_id is not null;

update public.support_threads
set in_progress_at = coalesce(in_progress_at, updated_at, created_at)
where status = 'in_progress';

update public.support_threads
set waiting_user_at = coalesce(waiting_user_at, updated_at, created_at)
where status = 'waiting_user';

update public.support_threads
set personal_queue_entered_at = coalesce(personal_queue_entered_at, updated_at, created_at)
where status = 'queued'
  and personal_queue = true;

update public.support_threads
set general_queue_entered_at = coalesce(general_queue_entered_at, updated_at, created_at)
where status = 'queued'
  and personal_queue = false;

update public.support_threads
set released_to_general_at = coalesce(released_to_general_at, updated_at, created_at)
where status = 'queued'
  and personal_queue = false
  and assigned_agent_id is null;

alter table public.support_threads
  drop constraint if exists support_threads_assignment_source_check;

alter table public.support_threads
  add constraint support_threads_assignment_source_check
  check (assignment_source in ('manual', 'new_auto', 'general_retake', 'irregular', 'system'));

drop index if exists public.support_threads_one_active_per_agent;

drop index if exists public.support_threads_one_active_per_user;
create unique index if not exists support_threads_one_active_per_user
  on public.support_threads(user_id)
  where user_id is not null
    and status not in ('closed', 'cancelled');

create index if not exists idx_support_threads_agent_workload
  on public.support_threads(assigned_agent_id, status, personal_queue, created_at desc);

create index if not exists idx_support_threads_assignment_queue
  on public.support_threads(status, assigned_agent_id, personal_queue, retake_requested_at, created_at);

create index if not exists idx_support_threads_tenant_app_assignment
  on public.support_threads(tenant_id, app_channel, created_at desc)
  where assigned_at is not null;

alter table public.support_agent_profiles
  add column if not exists auto_assign_mode text not null default 'auto';

alter table public.support_agent_profiles
  drop constraint if exists support_agent_profiles_auto_assign_mode_check;

alter table public.support_agent_profiles
  add constraint support_agent_profiles_auto_assign_mode_check
  check (auto_assign_mode in ('auto', 'manual'));

update public.support_agent_profiles p
set auto_assign_mode = 'manual'
from public.usuarios u
where u.id = p.user_id
  and lower(coalesce(u.role, '')) = 'admin'
  and p.auto_assign_mode = 'auto';

alter table public.support_runtime_flags
  add column if not exists auto_assign_enabled boolean not null default true,
  add column if not exists max_assigned_tickets integer not null default 5,
  add column if not exists max_processing_tickets integer not null default 1,
  add column if not exists wait_user_to_personal_queue_minutes integer not null default 10,
  add column if not exists personal_queue_release_minutes integer not null default 5,
  add column if not exists personal_queue_release_overload_minutes integer not null default 1,
  add column if not exists personal_queue_overload_threshold integer not null default 5,
  add column if not exists retake_reassignment_window_mode text not null default '7d',
  add column if not exists retake_reassignment_window_hours integer not null default 168,
  add column if not exists retake_reassignment_multiplier numeric not null default 1.25;

alter table public.support_runtime_flags
  drop constraint if exists support_runtime_flags_capacity_check;

alter table public.support_runtime_flags
  add constraint support_runtime_flags_capacity_check
  check (
    max_assigned_tickets >= 1
    and max_processing_tickets >= 1
    and max_processing_tickets <= max_assigned_tickets
  );

alter table public.support_runtime_flags
  drop constraint if exists support_runtime_flags_timeout_check;

alter table public.support_runtime_flags
  add constraint support_runtime_flags_timeout_check
  check (
    wait_user_to_personal_queue_minutes between 1 and 1440
    and personal_queue_release_minutes between 1 and 1440
    and personal_queue_release_overload_minutes between 1 and 1440
    and personal_queue_overload_threshold between 1 and 200
    and retake_reassignment_window_hours between 1 and 1440
    and retake_reassignment_multiplier between 1 and 5
  );

alter table public.support_runtime_flags
  drop constraint if exists support_runtime_flags_window_mode_check;

alter table public.support_runtime_flags
  add constraint support_runtime_flags_window_mode_check
  check (retake_reassignment_window_mode in ('2d', '7d', '15d', 'manual'));

create or replace function public.support_resolve_retake_window_hours(
  p_mode text,
  p_manual_hours integer default null
)
returns integer
language plpgsql
immutable
as $$
declare
  v_mode text := lower(trim(coalesce(p_mode, '7d')));
  v_manual integer := coalesce(p_manual_hours, 168);
begin
  if v_mode = '2d' then
    return 48;
  end if;
  if v_mode = '15d' then
    return 360;
  end if;
  if v_mode = 'manual' then
    return greatest(1, least(1440, v_manual));
  end if;
  return 168;
end;
$$;

grant execute on function public.support_resolve_retake_window_hours(text, integer) to authenticated;
grant execute on function public.support_resolve_retake_window_hours(text, integer) to service_role;

create or replace function public.support_assignment_delay_seconds(
  p_app_channel text,
  p_tenant_id uuid default null
)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_flags public.support_runtime_flags%rowtype;
  v_window_hours integer;
  v_multiplier numeric;
  v_base_seconds numeric;
  v_tenant_id uuid;
  v_app_channel text := lower(trim(coalesce(p_app_channel, 'referidos_app')));
begin
  select *
    into v_flags
  from public.support_runtime_flags
  where id = 1;

  if v_flags.id is null then
    return 375;
  end if;

  v_window_hours := public.support_resolve_retake_window_hours(
    v_flags.retake_reassignment_window_mode,
    v_flags.retake_reassignment_window_hours
  );
  v_multiplier := greatest(1, coalesce(v_flags.retake_reassignment_multiplier, 1.25));
  v_tenant_id := coalesce(p_tenant_id, public.current_usuario_tenant_id(), public.resolve_default_tenant_id());

  select avg(extract(epoch from (t.assigned_at - t.created_at)))
    into v_base_seconds
  from public.support_threads t
  where t.assigned_at is not null
    and t.created_at >= now() - make_interval(hours => v_window_hours)
    and coalesce(t.app_channel, 'referidos_app') = v_app_channel
    and (
      v_tenant_id is null
      or t.tenant_id = v_tenant_id
      or t.tenant_id is null
    );

  if v_base_seconds is null or v_base_seconds < 10 then
    v_base_seconds := 300;
  end if;

  return greatest(30, ceil(v_base_seconds * v_multiplier)::integer);
end;
$$;

grant execute on function public.support_assignment_delay_seconds(text, uuid) to authenticated;
grant execute on function public.support_assignment_delay_seconds(text, uuid) to service_role;

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
  general_queue_entered_at
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
                support_threads.status not in ('new', 'queued', 'closed', 'cancelled')
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
                t.status not in ('new', 'queued', 'closed', 'cancelled')
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
                t.status not in ('new', 'queued', 'closed', 'cancelled')
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
          t.status not in ('new', 'queued', 'closed', 'cancelled')
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
