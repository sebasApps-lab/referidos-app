do $$
begin
  if not exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'usuarios'
      and column_name = 'email_verificado'
  ) then
    if exists (
      select 1
      from information_schema.columns
      where table_schema = 'public'
        and table_name = 'usuarios'
        and column_name = 'emailConfirmado'
    ) then
      alter table public.usuarios rename column "emailConfirmado" to email_verificado;
    elsif exists (
      select 1
      from information_schema.columns
      where table_schema = 'public'
        and table_name = 'usuarios'
        and column_name = 'emailconfirmado'
    ) then
      alter table public.usuarios rename column emailconfirmado to email_verificado;
    end if;
  end if;
end $$;

create or replace function public.handle_new_user()
returns trigger
security definer
set search_path = public
language plpgsql
as $$
declare
  new_id text;
  role text;
  nombre_meta text;
  telefono_meta text;
begin
  role := coalesce(new.raw_user_meta_data->>'role', 'cliente');
  nombre_meta := coalesce(new.raw_user_meta_data->>'nombre', split_part(new.email,'@',1));
  telefono_meta := coalesce(new.raw_user_meta_data->>'telefono', new.phone, '');
  new_id := coalesce(new.raw_user_meta_data->>'id', 'USR_' || substr(md5(new.id::text), 1, 12));

  insert into usuarios (
    id, id_auth, email, telefono, nombre, apellido, role, email_verificado
  ) values (
    new_id,
    new.id,
    new.email,
    telefono_meta,
    nombre_meta,
    '',
    role,
    new.email_confirmed_at is not null
  ) on conflict (email) do update set
    id_auth = excluded.id_auth,
    telefono = excluded.telefono,
    nombre = excluded.nombre,
    role = excluded.role,
    email_verificado = excluded.email_verificado;

  return new;
end $$;

create or replace function public.sync_auth_user_to_usuarios()
returns trigger
security definer
set search_path = public
language plpgsql
as $$
begin
  update usuarios
  set email_verificado = (new.email_confirmed_at is not null)
  where id_auth = new.id;
  return new;
end $$;

drop policy if exists qr_insert_by_client on public.qr_validos;
create policy qr_insert_by_client on public.qr_validos
  for insert to authenticated
  with check (
    exists (
      select 1
      from usuarios u
      where u.id = qr_validos.cliente_id
        and u.id_auth = auth.uid()
        and u.email_verificado = true
    )
  );

drop policy if exists coment_insert_by_client on public.comentarios;
create policy coment_insert_by_client on public.comentarios
  for insert to authenticated
  with check (
    exists (
      select 1
      from usuarios u
      where u.id = comentarios.clienteId
        and u.id_auth = auth.uid()
        and u.email_verificado = true
    )
  );

-- ------------------------------------------------------------
-- Public ID prefix por rol (usuarios)
-- ------------------------------------------------------------
create or replace function public.user_public_id_prefix(p_role text)
returns text
language plpgsql
as $$
begin
  case lower(coalesce(p_role, ''))
    when 'negocio' then return 'NEG';
    when 'soporte' then return 'SUP';
    when 'support' then return 'SUP';
    when 'admin' then return 'ADM';
    when 'empleado' then return 'EMP';
    when 'dev' then return 'DEV';
    when 'cliente' then return 'USR';
    else return 'USR';
  end case;
end;
$$;

create or replace function public.set_user_public_id()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  candidate text;
  exists_id boolean;
  prefix text;
begin
  if new.public_id is not null then
    return new;
  end if;

  prefix := public.user_public_id_prefix(new.role);

  loop
    candidate := prefix || '-' || public.generate_public_id_suffix();
    select exists(select 1 from public.usuarios where public_id = candidate)
      into exists_id;
    if not exists_id then
      new.public_id := candidate;
      exit;
    end if;
  end loop;

  return new;
end;
$$;

update public.usuarios
set public_id = public.user_public_id_prefix(role) || '-' || public.generate_public_id_suffix()
where public_id is null;

update public.usuarios
set public_id = public.user_public_id_prefix(role) || '-' || split_part(public_id, '-', 2)
where public_id is not null
  and split_part(public_id, '-', 1) <> public.user_public_id_prefix(role)
  and split_part(public_id, '-', 2) <> '';

drop trigger if exists trg_usuarios_public_id on public.usuarios;
create trigger trg_usuarios_public_id
before insert on public.usuarios
for each row execute function public.set_user_public_id();

-- ------------------------------------------------------------
-- Soporte: enums
-- ------------------------------------------------------------
do $$
begin
  if not exists (select 1 from pg_type where typname = 'support_thread_status') then
    create type public.support_thread_status as enum (
      'new',
      'assigned',
      'in_progress',
      'waiting_user',
      'queued',
      'closed'
    );
  end if;
  if not exists (select 1 from pg_type where typname = 'support_severity') then
    create type public.support_severity as enum ('s0', 's1', 's2', 's3');
  end if;
  if not exists (select 1 from pg_type where typname = 'support_category') then
    create type public.support_category as enum (
      'acceso',
      'verificacion',
      'qr',
      'promos',
      'negocios_sucursales',
      'pagos_plan',
      'reporte_abuso',
      'bug_performance',
      'sugerencia',
      'tier_beneficios'
    );
  end if;
  if not exists (select 1 from pg_type where typname = 'support_event_type') then
    create type public.support_event_type as enum (
      'created',
      'assigned',
      'status_changed',
      'waiting_user',
      'resumed',
      'queued',
      'closed',
      'note_added',
      'agent_timeout_release',
      'agent_manual_release',
      'agent_login',
      'agent_logout',
      'agent_authorized',
      'agent_revoked'
    );
  end if;
  if not exists (select 1 from pg_type where typname = 'agent_session_end_reason') then
    create type public.agent_session_end_reason as enum (
      'logout',
      'timeout',
      'admin_revoke',
      'manual_end'
    );
  end if;
  if not exists (select 1 from pg_type where typname = 'support_log_level') then
    create type public.support_log_level as enum ('info', 'warn', 'error');
  end if;
  if not exists (select 1 from pg_type where typname = 'support_log_category') then
    create type public.support_log_category as enum (
      'auth',
      'onboarding',
      'scanner',
      'promos',
      'payments',
      'network',
      'ui_flow',
      'performance'
    );
  end if;
end $$;

-- ------------------------------------------------------------
-- Soporte: tablas
-- ------------------------------------------------------------
create table if not exists public.support_threads (
  id uuid primary key default gen_random_uuid(),
  public_id text not null,
  user_id text not null references public.usuarios(id) on delete cascade,
  user_public_id text not null,
  category public.support_category not null,
  severity public.support_severity not null default 's2',
  status public.support_thread_status not null default 'new',
  summary text,
  context jsonb default '{}'::jsonb,
  assigned_agent_id text references public.usuarios(id) on delete set null,
  assigned_agent_phone text,
  created_by_user_id text references public.usuarios(id) on delete set null,
  created_by_agent_id text references public.usuarios(id) on delete set null,
  irregular boolean not null default false,
  personal_queue boolean not null default false,
  wa_message_text text,
  wa_link text,
  suggested_contact_name text,
  suggested_tags text[] default '{}'::text[],
  resolution text,
  root_cause text,
  closed_at timestamptz,
  client_request_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists support_threads_public_id_unique
  on public.support_threads(public_id);

create index if not exists idx_support_threads_status
  on public.support_threads(status, created_at desc);

create index if not exists idx_support_threads_assigned_agent
  on public.support_threads(assigned_agent_id, status);

create unique index if not exists support_threads_client_request_unique
  on public.support_threads(user_id, client_request_id)
  where client_request_id is not null;

create unique index if not exists support_threads_one_active_per_user
  on public.support_threads(user_id)
  where status in ('new','assigned','in_progress','waiting_user','queued');

create unique index if not exists support_threads_one_active_per_agent
  on public.support_threads(assigned_agent_id)
  where assigned_agent_id is not null
    and status in ('assigned','in_progress','waiting_user');

create table if not exists public.support_thread_events (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.support_threads(id) on delete cascade,
  event_type public.support_event_type not null,
  actor_role text,
  actor_id text,
  details jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_support_thread_events_thread
  on public.support_thread_events(thread_id, created_at desc);

create table if not exists public.support_thread_notes (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.support_threads(id) on delete cascade,
  author_id text not null references public.usuarios(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.support_macros (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  category public.support_category,
  status public.support_thread_status,
  audience text[] default '{cliente,negocio}'::text[],
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.support_agent_profiles (
  user_id text primary key references public.usuarios(id) on delete cascade,
  support_phone text,
  authorized_for_work boolean not null default false,
  authorized_until timestamptz,
  blocked boolean not null default false,
  blocked_reason text,
  max_active_tickets int not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.ensure_support_agent_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if lower(coalesce(new.role, '')) in ('soporte', 'support') then
    insert into public.support_agent_profiles (user_id)
    values (new.id)
    on conflict (user_id) do nothing;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_support_agent_profile on public.usuarios;
create trigger trg_support_agent_profile
after insert or update of role on public.usuarios
for each row execute function public.ensure_support_agent_profile();

insert into public.support_agent_profiles (user_id)
select id
from public.usuarios
where lower(coalesce(role, '')) in ('soporte', 'support')
on conflict (user_id) do nothing;

create table if not exists public.support_agent_sessions (
  id uuid primary key default gen_random_uuid(),
  agent_id text not null references public.usuarios(id) on delete cascade,
  start_at timestamptz not null default now(),
  end_at timestamptz,
  end_reason public.agent_session_end_reason,
  authorized_by text references public.usuarios(id),
  last_seen_at timestamptz not null default now()
);

create index if not exists idx_support_agent_sessions_agent
  on public.support_agent_sessions(agent_id, end_at);

create table if not exists public.support_agent_events (
  id uuid primary key default gen_random_uuid(),
  agent_id text not null references public.usuarios(id) on delete cascade,
  event_type public.support_event_type not null,
  actor_id text,
  details jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.log_support_agent_profile_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  actor_usuario_id text;
begin
  select id into actor_usuario_id
  from public.usuarios
  where id_auth = auth.uid()
  limit 1;

  if new.authorized_for_work is distinct from old.authorized_for_work then
    insert into public.support_agent_events (agent_id, event_type, actor_id, details)
    values (
      new.user_id,
      case when new.authorized_for_work then 'agent_authorized' else 'agent_revoked' end,
      actor_usuario_id,
      jsonb_build_object('authorized_for_work', new.authorized_for_work)
    );
  end if;

  if new.blocked is distinct from old.blocked then
    insert into public.support_agent_events (agent_id, event_type, actor_id, details)
    values (
      new.user_id,
      case when new.blocked then 'agent_revoked' else 'agent_authorized' end,
      actor_usuario_id,
      jsonb_build_object('blocked', new.blocked, 'blocked_reason', new.blocked_reason)
    );
  end if;

  return new;
end;
$$;

drop trigger if exists trg_support_agent_profile_audit on public.support_agent_profiles;
create trigger trg_support_agent_profile_audit
after update on public.support_agent_profiles
for each row execute function public.log_support_agent_profile_change();

create table if not exists public.support_user_logs (
  id uuid primary key default gen_random_uuid(),
  user_id text not null references public.usuarios(id) on delete cascade,
  role text,
  level public.support_log_level not null,
  category public.support_log_category not null,
  request_id text,
  message text,
  context jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_support_user_logs_user
  on public.support_user_logs(user_id, created_at desc);

create index if not exists idx_support_user_logs_category
  on public.support_user_logs(category, created_at desc);

-- ------------------------------------------------------------
-- Triggers: public_id soporte
-- ------------------------------------------------------------
drop trigger if exists trg_support_threads_public_id on public.support_threads;
create trigger trg_support_threads_public_id
before insert on public.support_threads
for each row execute function public.set_public_id('TKT');

-- ------------------------------------------------------------
-- Views (resumen para usuario)
-- ------------------------------------------------------------
create or replace view public.support_threads_public
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
  closed_at
from public.support_threads;

do $$
begin
  execute 'alter view public.support_threads_public set (security_invoker = true)';
exception
  when others then
    null;
end $$;

-- ------------------------------------------------------------
-- RLS helpers
-- ------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.usuarios u
    where u.id_auth = auth.uid() and u.role = 'admin'
  );
$$;

create or replace function public.is_support()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.usuarios u
    where u.id_auth = auth.uid() and u.role = 'soporte'
  );
$$;

-- ------------------------------------------------------------
-- RLS: soporte
-- ------------------------------------------------------------
alter table public.support_threads enable row level security;
alter table public.support_thread_events enable row level security;
alter table public.support_thread_notes enable row level security;
alter table public.support_macros enable row level security;
alter table public.support_agent_profiles enable row level security;
alter table public.support_agent_sessions enable row level security;
alter table public.support_agent_events enable row level security;
alter table public.support_user_logs enable row level security;

drop policy if exists support_threads_select on public.support_threads;
create policy support_threads_select on public.support_threads
  for select to authenticated
  using (
    exists (
      select 1 from public.usuarios u
      where u.id_auth = auth.uid()
        and (
          u.id = support_threads.user_id
          or (
            u.role = 'soporte'
            and (
              support_threads.assigned_agent_id = u.id
              or support_threads.created_by_agent_id = u.id
              or (support_threads.status = 'new' and support_threads.assigned_agent_id is null)
            )
          )
          or u.role = 'admin'
        )
    )
  );

drop policy if exists support_threads_insert on public.support_threads;
create policy support_threads_insert on public.support_threads
  for insert to authenticated
  with check (
    exists (
      select 1 from public.usuarios u
      where u.id_auth = auth.uid()
        and (
          (u.id = support_threads.user_id and support_threads.created_by_user_id = u.id)
          or (u.role in ('soporte','admin') and support_threads.created_by_agent_id = u.id)
        )
    )
  );

drop policy if exists support_threads_update on public.support_threads;
create policy support_threads_update on public.support_threads
  for update to authenticated
  using (
    exists (
      select 1 from public.usuarios u
      where u.id_auth = auth.uid()
        and (
          (u.role = 'soporte' and (support_threads.assigned_agent_id = u.id or support_threads.created_by_agent_id = u.id))
          or u.role = 'admin'
        )
    )
  )
  with check (
    exists (
      select 1 from public.usuarios u
      where u.id_auth = auth.uid()
        and (
          (u.role = 'soporte' and (support_threads.assigned_agent_id = u.id or support_threads.created_by_agent_id = u.id))
          or u.role = 'admin'
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
          or (u.role = 'soporte' and (t.assigned_agent_id = u.id or t.created_by_agent_id = u.id))
          or u.role = 'admin'
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
          (u.role = 'soporte' and (t.assigned_agent_id = u.id or t.created_by_agent_id = u.id))
          or u.role = 'admin'
        )
    )
  );

drop policy if exists support_thread_notes_insert on public.support_thread_notes;
create policy support_thread_notes_insert on public.support_thread_notes
  for insert to authenticated
  with check (
    exists (
      select 1
      from public.support_threads t
      join public.usuarios u on u.id_auth = auth.uid()
      where t.id = support_thread_notes.thread_id
        and (
          (u.role = 'soporte' and (t.assigned_agent_id = u.id or t.created_by_agent_id = u.id))
          or u.role = 'admin'
        )
        and support_thread_notes.author_id = u.id
    )
  );

drop policy if exists support_macros_select on public.support_macros;
create policy support_macros_select on public.support_macros
  for select to authenticated
  using (
    public.is_support() or public.is_admin()
  );

drop policy if exists support_macros_admin_insert on public.support_macros;
create policy support_macros_admin_insert on public.support_macros
  for insert to authenticated
  with check (public.is_admin());

drop policy if exists support_macros_admin_update on public.support_macros;
create policy support_macros_admin_update on public.support_macros
  for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists support_macros_admin_delete on public.support_macros;
create policy support_macros_admin_delete on public.support_macros
  for delete to authenticated
  using (public.is_admin());

drop policy if exists support_agent_profiles_select on public.support_agent_profiles;
create policy support_agent_profiles_select on public.support_agent_profiles
  for select to authenticated
  using (
    public.is_admin()
    or exists (
      select 1 from public.usuarios u
      where u.id_auth = auth.uid()
        and u.id = support_agent_profiles.user_id
    )
  );

drop policy if exists support_agent_profiles_admin_write on public.support_agent_profiles;
create policy support_agent_profiles_admin_write on public.support_agent_profiles
  for insert to authenticated
  with check (public.is_admin());

drop policy if exists support_agent_profiles_admin_update on public.support_agent_profiles;
create policy support_agent_profiles_admin_update on public.support_agent_profiles
  for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists support_agent_sessions_select on public.support_agent_sessions;
create policy support_agent_sessions_select on public.support_agent_sessions
  for select to authenticated
  using (
    public.is_admin()
    or exists (
      select 1 from public.usuarios u
      where u.id_auth = auth.uid()
        and u.id = support_agent_sessions.agent_id
    )
  );

drop policy if exists support_agent_events_select on public.support_agent_events;
create policy support_agent_events_select on public.support_agent_events
  for select to authenticated
  using (
    public.is_admin()
    or exists (
      select 1 from public.usuarios u
      where u.id_auth = auth.uid()
        and u.id = support_agent_events.agent_id
    )
  );

drop policy if exists support_user_logs_select on public.support_user_logs;
create policy support_user_logs_select on public.support_user_logs
  for select to authenticated
  using (
    public.is_admin()
    or exists (
      select 1
      from public.support_threads t
      join public.usuarios u on u.id_auth = auth.uid()
      where t.user_id = support_user_logs.user_id
        and (
          (u.role = 'soporte' and (t.assigned_agent_id = u.id or t.created_by_agent_id = u.id))
        )
        and t.status in ('assigned','in_progress','waiting_user')
    )
  );

-- ------------------------------------------------------------
-- Seed macros (base)
-- ------------------------------------------------------------
insert into public.support_macros (title, body, category, status, audience)
select v.title,
       v.body,
       v.category::public.support_category,
       v.status::public.support_thread_status,
       v.audience::text[]
from (
  values
    ('Bienvenida', 'Hola, gracias por escribirnos. Ya estoy revisando tu caso y te confirmo en un momento.', null, 'new', '{cliente,negocio}'),
    ('Confirmacion de recepcion', 'Recibi tu solicitud. En breve te confirmo los siguientes pasos.', null, 'new', '{cliente,negocio}'),
    ('Tomando el caso', 'Ya tengo tu caso asignado. Empiezo a revisarlo ahora mismo.', null, 'assigned', '{cliente,negocio}'),
    ('Solicitar pasos', 'Para ayudarte mejor: 1) pasos exactos, 2) pantalla, 3) mensaje de error si aparece.', null, 'in_progress', '{cliente,negocio}'),
    ('Solicitar evidencia', 'Si puedes, envia una captura o video corto del problema.', null, 'in_progress', '{cliente,negocio}'),
    ('Esperando respuesta', 'Quedo atento a tu respuesta para continuar con el caso.', null, 'waiting_user', '{cliente,negocio}'),
    ('Caso en cola', 'Tu caso quedo en cola. Te escribo apenas lo retome.', null, 'queued', '{cliente,negocio}'),
    ('Reanudado', 'Gracias por responder. Retomo tu caso ahora mismo.', null, 'in_progress', '{cliente,negocio}'),
    ('Cierre cordial', 'Hemos resuelto el caso. Si necesitas algo mas, escribe nuevamente.', null, 'closed', '{cliente,negocio}'),
    ('Cierre por falta de respuesta', 'Cierro el caso por falta de respuesta. Si lo necesitas, abre un nuevo ticket y retomamos.', null, 'closed', '{cliente,negocio}'),

    ('Acceso - Restablecer contrasena', 'Si no puedes ingresar, usa "Olvide mi contrasena" en la pantalla de acceso y sigue el enlace.', 'acceso', 'in_progress', '{cliente,negocio}'),
    ('Acceso - Correo no llega', 'Si no llega el correo, revisa spam/promociones y confirma que el correo este bien escrito.', 'acceso', 'in_progress', '{cliente,negocio}'),
    ('Acceso - Bloqueo', 'Tu cuenta podria estar bloqueada por intentos fallidos. Confirma si recibiste algun aviso.', 'acceso', 'in_progress', '{cliente,negocio}'),
    ('Acceso - Proveedor externo', 'Si usas Google/Apple, intenta ingresar con el mismo proveedor y no con correo y contrasena.', 'acceso', 'in_progress', '{cliente,negocio}'),

    ('Verificacion - Correo', 'Te enviamos un enlace al correo registrado. Revisa tambien spam.', 'verificacion', 'in_progress', '{cliente,negocio}'),
    ('Verificacion - Telefono', 'Confirma tu numero y el codigo recibido para completar la verificacion.', 'verificacion', 'in_progress', '{cliente,negocio}'),
    ('Verificacion - RUC', 'Envia el RUC completo (13 digitos) y el nombre del negocio para validarlo.', 'verificacion', 'in_progress', '{negocio}'),

    ('QR - Expirado', 'El QR puede estar expirado. Genera uno nuevo y vuelve a escanear.', 'qr', 'in_progress', '{cliente,negocio}'),
    ('QR - No valida', 'Asegura buena luz, limpia la camara y evita reflejos antes de escanear.', 'qr', 'in_progress', '{cliente,negocio}'),
    ('QR - Ya usado', 'Este QR ya fue canjeado. Confirma fecha y hora del canje.', 'qr', 'in_progress', '{cliente,negocio}'),
    ('QR - Sucursal', 'Confirma la sucursal y el negocio donde intentaste canjear.', 'qr', 'in_progress', '{cliente,negocio}'),

    ('Promos - No visible', 'La promo puede estar oculta o fuera de vigencia. Confirma el nombre exacto.', 'promos', 'in_progress', '{cliente,negocio}'),
    ('Promos - Condiciones', 'Revisemos condiciones (horario, sucursal, requisitos). Envia el detalle.', 'promos', 'in_progress', '{cliente,negocio}'),
    ('Promos - Canje fallido', 'Indica en que paso fallo el canje o si mostro algun error.', 'promos', 'in_progress', '{cliente,negocio}'),
    ('Promos - Cupos', 'Algunas promos tienen cupos. Confirmo si ya se agotaron.', 'promos', 'in_progress', '{cliente,negocio}'),

    ('Negocios - Datos', 'Confirma el nombre del negocio y la sucursal afectada para revisar el caso.', 'negocios_sucursales', 'in_progress', '{negocio}'),
    ('Negocios - Horarios', 'Confirma horarios y zona para validar la configuracion.', 'negocios_sucursales', 'in_progress', '{negocio}'),
    ('Negocios - Direccion', 'Si la direccion no aparece, verifica calle, canton y provincia.', 'negocios_sucursales', 'in_progress', '{negocio}'),
    ('Negocios - Verificacion', 'La verificacion del negocio puede estar en revision. Te confirmo el estado.', 'negocios_sucursales', 'in_progress', '{negocio}'),

    ('Pagos - Pendiente', 'Si el pago esta pendiente, comparte fecha y metodo utilizado.', 'pagos_plan', 'in_progress', '{negocio}'),
    ('Pagos - Factura', 'Para factura, indica RUC y correo de facturacion.', 'pagos_plan', 'in_progress', '{negocio}'),
    ('Plan - Upgrade', 'Confirma el plan actual y el plan solicitado para revisarlo.', 'pagos_plan', 'in_progress', '{negocio}'),
    ('Plan - No aplicado', 'Si el plan no se refleja, comparteme el comprobante.', 'pagos_plan', 'in_progress', '{negocio}'),

    ('Reporte - Recibido', 'Gracias por reportar. Revisaremos el contenido y te avisaremos el resultado.', 'reporte_abuso', 'in_progress', '{cliente,negocio}'),
    ('Reporte - Detalle', 'Indica el contenido y el motivo para revisar el caso.', 'reporte_abuso', 'in_progress', '{cliente,negocio}'),

    ('Bug - Datos tecnicos', 'Confirma version de app, dispositivo y pasos para reproducir.', 'bug_performance', 'in_progress', '{cliente,negocio}'),
    ('Bug - Red', 'Si hay fallos de red, intenta con otra conexion y confirma el error.', 'bug_performance', 'in_progress', '{cliente,negocio}'),
    ('Bug - Rendimiento', 'Indica en que pantalla ocurre la lentitud y si mejora al reiniciar.', 'bug_performance', 'in_progress', '{cliente,negocio}'),

    ('Sugerencia - Gracias', 'Gracias por la sugerencia. La registramos para evaluacion.', 'sugerencia', 'in_progress', '{cliente,negocio}'),
    ('Sugerencia - Detalle', 'Si puedes, detalla el beneficio o problema que resuelve.', 'sugerencia', 'in_progress', '{cliente,negocio}'),

    ('Tier - Requisitos', 'Para activar beneficios, completa perfil, agrega telefono y verifica correo.', 'tier_beneficios', 'in_progress', '{cliente}'),
    ('Tier - Progreso', 'El avance se actualiza tras completar datos y confirmar correo. Puedo revisar tu estado.', 'tier_beneficios', 'in_progress', '{cliente}')
) as v(title, body, category, status, audience)
where not exists (
  select 1
  from public.support_macros m
  where m.title = v.title
    and m.category is not distinct from v.category::public.support_category
    and m.status is not distinct from v.status::public.support_thread_status
);

-- ------------------------------------------------------------
-- Retencion (funcion manual para limpieza)
-- ------------------------------------------------------------
create or replace function public.support_cleanup()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  delete from public.support_user_logs
    where created_at < now() - interval '20 days';
  delete from public.support_threads
    where status = 'closed'
      and closed_at is not null
      and closed_at < now() - interval '90 days';
end;
$$;
