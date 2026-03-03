-- 20260323_000042_notifications_center.sql
-- Centro de notificaciones in-app multi-rol + proyeccion automatica desde eventos de soporte.

begin;

create table if not exists public.app_notifications (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null default coalesce(public.current_usuario_tenant_id(), public.resolve_default_tenant_id())
    references public.tenants(id) on delete cascade,
  role_target text not null,
  recipient_user_id uuid null references public.usuarios(id) on delete cascade,
  channel text not null default 'in_app',
  scope text not null default 'general',
  event_type text not null,
  title text not null,
  body text not null default '',
  payload jsonb not null default '{}'::jsonb,
  is_read boolean not null default false,
  read_at timestamptz null,
  expires_at timestamptz null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint app_notifications_role_target_check
    check (role_target in ('admin', 'soporte', 'cliente', 'negocio', 'all')),
  constraint app_notifications_channel_check
    check (channel in ('in_app')),
  constraint app_notifications_read_consistency_check
    check (
      (is_read = false and read_at is null)
      or (is_read = true and read_at is not null)
    )
);

create index if not exists idx_app_notifications_tenant_created
  on public.app_notifications (tenant_id, created_at desc);

create index if not exists idx_app_notifications_recipient_unread
  on public.app_notifications (recipient_user_id, is_read, created_at desc)
  where recipient_user_id is not null;

create index if not exists idx_app_notifications_role_unread
  on public.app_notifications (role_target, is_read, created_at desc);

create index if not exists idx_app_notifications_scope_created
  on public.app_notifications (scope, created_at desc);

drop trigger if exists trg_app_notifications_touch_updated_at on public.app_notifications;
create trigger trg_app_notifications_touch_updated_at
before update on public.app_notifications
for each row execute function public.touch_updated_at();

create or replace function public.notifications_normalize_role_target(p_role text)
returns text
language sql
immutable
as $$
  select case lower(trim(coalesce(p_role, '')))
    when 'admin' then 'admin'
    when 'soporte' then 'soporte'
    when 'support' then 'soporte'
    when 'cliente' then 'cliente'
    when 'negocio' then 'negocio'
    when 'all' then 'all'
    else 'all'
  end;
$$;

create or replace function public.notifications_current_role_target()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select public.notifications_normalize_role_target(public.current_usuario_role());
$$;

create or replace function public.notifications_can_access_row(
  p_role_target text,
  p_recipient_user_id uuid
)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    p_role_target = 'all'
    or (p_recipient_user_id is not null and p_recipient_user_id = public.current_usuario_id())
    or (
      public.notifications_current_role_target() = 'admin'
      and p_role_target = 'admin'
    )
    or (
      public.notifications_current_role_target() = 'soporte'
      and p_role_target = 'soporte'
    )
    or (
      public.notifications_current_role_target() = 'cliente'
      and p_role_target = 'cliente'
    )
    or (
      public.notifications_current_role_target() = 'negocio'
      and p_role_target = 'negocio'
    ),
    false
  );
$$;

create or replace function public.notifications_enqueue(
  p_tenant_id uuid,
  p_role_target text,
  p_recipient_user_id uuid default null,
  p_scope text default 'general',
  p_event_type text default 'event',
  p_title text default 'Notificacion',
  p_body text default '',
  p_payload jsonb default '{}'::jsonb,
  p_expires_at timestamptz default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id uuid;
  v_tenant_id uuid := coalesce(p_tenant_id, public.resolve_default_tenant_id());
  v_role_target text := public.notifications_normalize_role_target(p_role_target);
begin
  insert into public.app_notifications (
    tenant_id,
    role_target,
    recipient_user_id,
    scope,
    event_type,
    title,
    body,
    payload,
    expires_at
  )
  values (
    v_tenant_id,
    v_role_target,
    p_recipient_user_id,
    coalesce(nullif(trim(coalesce(p_scope, '')), ''), 'general'),
    coalesce(nullif(trim(coalesce(p_event_type, '')), ''), 'event'),
    coalesce(nullif(trim(coalesce(p_title, '')), ''), 'Notificacion'),
    coalesce(p_body, ''),
    coalesce(p_payload, '{}'::jsonb),
    p_expires_at
  )
  returning id into v_id;

  return v_id;
end;
$$;

create or replace function public.notifications_mark_read(
  p_ids uuid[] default null
)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_count integer := 0;
begin
  update public.app_notifications n
  set
    is_read = true,
    read_at = now(),
    updated_at = now()
  where (p_ids is null or n.id = any(p_ids))
    and n.is_read = false
    and n.tenant_id = public.current_usuario_tenant_id()
    and public.notifications_can_access_row(n.role_target, n.recipient_user_id);

  get diagnostics v_count = row_count;
  return v_count;
end;
$$;

create or replace function public.notifications_mark_all_read(
  p_scope text default null
)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_count integer := 0;
begin
  update public.app_notifications n
  set
    is_read = true,
    read_at = now(),
    updated_at = now()
  where n.is_read = false
    and n.tenant_id = public.current_usuario_tenant_id()
    and (p_scope is null or n.scope = p_scope)
    and public.notifications_can_access_row(n.role_target, n.recipient_user_id);

  get diagnostics v_count = row_count;
  return v_count;
end;
$$;

grant execute on function public.notifications_normalize_role_target(text) to authenticated;
grant execute on function public.notifications_current_role_target() to authenticated;
grant execute on function public.notifications_can_access_row(text, uuid) to authenticated;
grant execute on function public.notifications_mark_read(uuid[]) to authenticated;
grant execute on function public.notifications_mark_all_read(text) to authenticated;
grant execute on function public.notifications_enqueue(uuid, text, uuid, text, text, text, text, jsonb, timestamptz) to service_role;

grant select on public.app_notifications to authenticated;
grant select, insert, update, delete on public.app_notifications to service_role;

alter table public.app_notifications enable row level security;

drop policy if exists app_notifications_select_authenticated on public.app_notifications;
create policy app_notifications_select_authenticated
  on public.app_notifications
  for select to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and public.notifications_can_access_row(role_target, recipient_user_id)
  );

drop policy if exists app_notifications_update_authenticated on public.app_notifications;
create policy app_notifications_update_authenticated
  on public.app_notifications
  for update to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and public.notifications_can_access_row(role_target, recipient_user_id)
  )
  with check (
    tenant_id = public.current_usuario_tenant_id()
    and public.notifications_can_access_row(role_target, recipient_user_id)
  );

create or replace function public.trg_support_thread_events_to_notifications()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_thread record;
  v_tenant_id uuid;
  v_user_role_target text;
begin
  select
    t.id,
    t.public_id,
    t.tenant_id,
    t.user_id,
    t.assigned_agent_id,
    t.category,
    t.status,
    t.app_channel
  into v_thread
  from public.support_threads t
  where t.id = new.thread_id
  limit 1;

  if v_thread.id is null then
    return new;
  end if;

  v_tenant_id := coalesce(v_thread.tenant_id, public.resolve_default_tenant_id());

  if new.event_type::text = 'starting' and v_thread.assigned_agent_id is not null then
    perform public.notifications_enqueue(
      p_tenant_id => v_tenant_id,
      p_role_target => 'soporte',
      p_recipient_user_id => v_thread.assigned_agent_id,
      p_scope => 'support',
      p_event_type => 'support.ticket.assigned',
      p_title => 'Ticket asignado',
      p_body => format('Ticket %s asignado', coalesce(v_thread.public_id, '')),
      p_payload => jsonb_build_object(
        'thread_id', v_thread.id,
        'thread_public_id', v_thread.public_id,
        'category', v_thread.category,
        'status', v_thread.status,
        'app_channel', v_thread.app_channel,
        'source_event_id', new.id,
        'source_event_type', new.event_type
      )
    );
  elsif new.event_type::text = 'queued'
    and coalesce(new.details->>'queue_kind', '') = 'personal'
    and coalesce(new.details->>'reason', '') = 'waiting_user_timeout'
    and v_thread.assigned_agent_id is not null then
    perform public.notifications_enqueue(
      p_tenant_id => v_tenant_id,
      p_role_target => 'soporte',
      p_recipient_user_id => v_thread.assigned_agent_id,
      p_scope => 'support',
      p_event_type => 'support.ticket.personal_queue_timeout',
      p_title => 'Ticket en cola personal',
      p_body => format('Ticket %s paso a cola personal', coalesce(v_thread.public_id, '')),
      p_payload => jsonb_build_object(
        'thread_id', v_thread.id,
        'thread_public_id', v_thread.public_id,
        'category', v_thread.category,
        'status', v_thread.status,
        'app_channel', v_thread.app_channel,
        'source_event_id', new.id,
        'source_event_type', new.event_type
      )
    );
  elsif new.event_type::text in ('closed', 'cancelled') and v_thread.user_id is not null then
    select public.notifications_normalize_role_target(u.role)
      into v_user_role_target
    from public.usuarios u
    where u.id = v_thread.user_id
    limit 1;

    if v_user_role_target is null then
      v_user_role_target := 'all';
    end if;

    perform public.notifications_enqueue(
      p_tenant_id => v_tenant_id,
      p_role_target => v_user_role_target,
      p_recipient_user_id => v_thread.user_id,
      p_scope => 'support',
      p_event_type => case when new.event_type::text = 'closed' then 'support.ticket.closed' else 'support.ticket.cancelled' end,
      p_title => case when new.event_type::text = 'closed' then 'Ticket resuelto' else 'Ticket cancelado' end,
      p_body => format(
        'Ticket %s %s',
        coalesce(v_thread.public_id, ''),
        case when new.event_type::text = 'closed' then 'fue resuelto' else 'fue cancelado' end
      ),
      p_payload => jsonb_build_object(
        'thread_id', v_thread.id,
        'thread_public_id', v_thread.public_id,
        'category', v_thread.category,
        'status', v_thread.status,
        'app_channel', v_thread.app_channel,
        'source_event_id', new.id,
        'source_event_type', new.event_type
      )
    );
  end if;

  return new;
end;
$$;

drop trigger if exists trg_support_thread_events_to_notifications on public.support_thread_events;
create trigger trg_support_thread_events_to_notifications
after insert on public.support_thread_events
for each row execute function public.trg_support_thread_events_to_notifications();

commit;
