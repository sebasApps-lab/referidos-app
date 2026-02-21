-- 20260306_000028_support_macro_usage_analytics.sql
-- Analytics de macros de soporte (shown/copied) con ventanas 1d/7d/15d/30d.

begin;

create table if not exists public.support_macro_usage_events (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  macro_id uuid not null,
  macro_code text not null check (length(trim(macro_code)) > 0),
  category_code text,
  thread_public_id text,
  event_type text not null check (event_type in ('shown', 'copied')),
  app_key text not null check (app_key in ('referidos_app', 'prelaunch_web', 'android_app')),
  env_key text not null check (env_key in ('dev', 'staging', 'prod')),
  actor_role text not null check (actor_role in ('admin', 'soporte')),
  actor_usuario_id uuid references public.usuarios(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_support_macro_usage_events_tenant_created
  on public.support_macro_usage_events (tenant_id, created_at desc);

create index if not exists idx_support_macro_usage_events_macro_event_created
  on public.support_macro_usage_events (macro_id, event_type, created_at desc);

create index if not exists idx_support_macro_usage_events_tenant_macro_app_created
  on public.support_macro_usage_events (tenant_id, macro_id, app_key, created_at desc);

create or replace function public.trg_support_macro_usage_events_set_context()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_usuario_id uuid;
  v_tenant_id uuid;
  v_role text;
begin
  v_usuario_id := public.current_usuario_id();
  if v_usuario_id is null then
    raise exception 'support_macro_usage_events: usuario no autenticado';
  end if;

  select u.tenant_id, lower(u.role)
    into v_tenant_id, v_role
  from public.usuarios u
  where u.id = v_usuario_id
  limit 1;

  if v_tenant_id is null then
    raise exception 'support_macro_usage_events: perfil de usuario no encontrado';
  end if;
  if v_role not in ('admin', 'soporte') then
    raise exception 'support_macro_usage_events: rol no autorizado';
  end if;

  new.tenant_id := v_tenant_id;
  new.actor_usuario_id := v_usuario_id;
  new.actor_role := v_role;
  new.event_type := lower(trim(coalesce(new.event_type, '')));
  new.app_key := lower(trim(coalesce(new.app_key, '')));
  new.env_key := lower(trim(coalesce(new.env_key, '')));
  new.macro_code := lower(trim(coalesce(new.macro_code, '')));
  new.category_code := nullif(lower(trim(coalesce(new.category_code, ''))), '');
  new.thread_public_id := nullif(trim(coalesce(new.thread_public_id, '')), '');
  new.metadata := coalesce(new.metadata, '{}'::jsonb);

  if new.event_type not in ('shown', 'copied') then
    raise exception 'support_macro_usage_events: event_type invalido';
  end if;
  if new.app_key not in ('referidos_app', 'prelaunch_web', 'android_app') then
    raise exception 'support_macro_usage_events: app_key invalido';
  end if;
  if new.env_key not in ('dev', 'staging', 'prod') then
    raise exception 'support_macro_usage_events: env_key invalido';
  end if;
  if new.macro_id is null then
    raise exception 'support_macro_usage_events: macro_id es requerido';
  end if;
  if length(new.macro_code) = 0 then
    raise exception 'support_macro_usage_events: macro_code es requerido';
  end if;

  return new;
end;
$$;

drop trigger if exists trg_support_macro_usage_events_set_context on public.support_macro_usage_events;
create trigger trg_support_macro_usage_events_set_context
before insert on public.support_macro_usage_events
for each row execute function public.trg_support_macro_usage_events_set_context();

grant select, insert on public.support_macro_usage_events to authenticated;
grant select, insert, update, delete on public.support_macro_usage_events to service_role;

alter table public.support_macro_usage_events enable row level security;

drop policy if exists support_macro_usage_events_select_support_admin on public.support_macro_usage_events;
create policy support_macro_usage_events_select_support_admin
  on public.support_macro_usage_events
  for select to authenticated
  using (
    tenant_id = public.current_usuario_tenant_id()
    and (public.is_admin() or public.is_support())
  );

drop policy if exists support_macro_usage_events_insert_support_admin on public.support_macro_usage_events;
create policy support_macro_usage_events_insert_support_admin
  on public.support_macro_usage_events
  for insert to authenticated
  with check (
    tenant_id = public.current_usuario_tenant_id()
    and (public.is_admin() or public.is_support())
  );

create or replace function public.support_macro_usage_summary(
  p_macro_ids uuid[] default null,
  p_app_key text default null
)
returns table (
  macro_id uuid,
  shown_1d bigint,
  shown_7d bigint,
  shown_15d bigint,
  shown_30d bigint,
  copied_1d bigint,
  copied_7d bigint,
  copied_15d bigint,
  copied_30d bigint
)
language sql
stable
set search_path = public
as $$
  with scoped as (
    select
      e.macro_id,
      e.event_type,
      e.created_at
    from public.support_macro_usage_events e
    where e.tenant_id = public.current_usuario_tenant_id()
      and (
        p_macro_ids is null
        or array_length(p_macro_ids, 1) is null
        or e.macro_id = any (p_macro_ids)
      )
      and (
        nullif(lower(trim(coalesce(p_app_key, ''))), '') is null
        or lower(trim(coalesce(p_app_key, ''))) = 'all'
        or e.app_key = lower(trim(coalesce(p_app_key, '')))
      )
  )
  select
    s.macro_id,
    count(*) filter (where s.event_type = 'shown' and s.created_at >= now() - interval '1 day')::bigint as shown_1d,
    count(*) filter (where s.event_type = 'shown' and s.created_at >= now() - interval '7 day')::bigint as shown_7d,
    count(*) filter (where s.event_type = 'shown' and s.created_at >= now() - interval '15 day')::bigint as shown_15d,
    count(*) filter (where s.event_type = 'shown' and s.created_at >= now() - interval '30 day')::bigint as shown_30d,
    count(*) filter (where s.event_type = 'copied' and s.created_at >= now() - interval '1 day')::bigint as copied_1d,
    count(*) filter (where s.event_type = 'copied' and s.created_at >= now() - interval '7 day')::bigint as copied_7d,
    count(*) filter (where s.event_type = 'copied' and s.created_at >= now() - interval '15 day')::bigint as copied_15d,
    count(*) filter (where s.event_type = 'copied' and s.created_at >= now() - interval '30 day')::bigint as copied_30d
  from scoped s
  group by s.macro_id;
$$;

grant execute on function public.support_macro_usage_summary(uuid[], text) to authenticated;
grant execute on function public.support_macro_usage_summary(uuid[], text) to service_role;

commit;
