do $$
begin
  if not exists (select 1 from pg_type where typname = 'feedback_submission_status') then
    create type public.feedback_submission_status as enum (
      'new',
      'reviewed',
      'triaged',
      'planned',
      'implemented',
      'dismissed',
      'spam',
      'archived'
    );
  end if;

  if not exists (select 1 from pg_type where typname = 'feedback_event_type') then
    create type public.feedback_event_type as enum (
      'created',
      'duplicate_detected',
      'status_changed',
      'note_added',
      'marked_spam',
      'archived'
    );
  end if;
end $$;

create table if not exists public.intake_guard_events (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null,
  system_key text not null,
  action_key text not null,
  origin_role text check (origin_role in ('cliente', 'negocio')),
  app_channel text,
  source_route text,
  source_surface text,
  anon_id uuid,
  visit_session_id uuid,
  contact_hash text,
  message_hash text,
  fingerprint text,
  ip_risk_id text,
  ua_hash text,
  outcome text not null,
  reason text,
  risk_score integer not null default 0,
  risk_flags jsonb not null default '{}'::jsonb,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_intake_guard_events_system_created
  on public.intake_guard_events (tenant_id, system_key, action_key, created_at desc);

create index if not exists idx_intake_guard_events_ip_created
  on public.intake_guard_events (tenant_id, ip_risk_id, created_at desc)
  where ip_risk_id is not null;

create index if not exists idx_intake_guard_events_contact_created
  on public.intake_guard_events (tenant_id, contact_hash, created_at desc)
  where contact_hash is not null;

create index if not exists idx_intake_guard_events_fingerprint_created
  on public.intake_guard_events (tenant_id, fingerprint, created_at desc)
  where fingerprint is not null;

create table if not exists public.feedback_submissions (
  id uuid primary key default gen_random_uuid(),
  public_id text not null,
  tenant_id uuid not null,
  app_channel text not null,
  origin_source text not null,
  source_route text,
  source_surface text,
  origin_role text not null default 'cliente'
    check (origin_role in ('cliente', 'negocio')),
  status public.feedback_submission_status not null default 'new',
  name text,
  email text,
  email_hash text,
  message text not null,
  message_hash text not null,
  submission_fingerprint text,
  anon_id uuid,
  visit_session_id uuid,
  user_id uuid references public.usuarios(id) on delete set null,
  utm jsonb not null default '{}'::jsonb,
  context jsonb not null default '{}'::jsonb,
  ua_hash text,
  ip_risk_id text,
  risk_score integer not null default 0,
  risk_flags jsonb not null default '{}'::jsonb,
  repeat_count integer not null default 1,
  first_received_at timestamptz not null default now(),
  last_received_at timestamptz not null default now(),
  reviewed_by uuid references public.usuarios(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists feedback_submissions_public_id_unique
  on public.feedback_submissions (public_id);

create index if not exists idx_feedback_submissions_status_created
  on public.feedback_submissions (tenant_id, status, created_at desc);

create index if not exists idx_feedback_submissions_origin_created
  on public.feedback_submissions (tenant_id, origin_role, created_at desc);

create index if not exists idx_feedback_submissions_route_created
  on public.feedback_submissions (tenant_id, source_route, created_at desc);

create index if not exists idx_feedback_submissions_email_hash
  on public.feedback_submissions (tenant_id, email_hash, created_at desc)
  where email_hash is not null;

create index if not exists idx_feedback_submissions_message_hash
  on public.feedback_submissions (tenant_id, message_hash, created_at desc);

create index if not exists idx_feedback_submissions_fingerprint
  on public.feedback_submissions (tenant_id, submission_fingerprint, created_at desc)
  where submission_fingerprint is not null;

create table if not exists public.feedback_events (
  id uuid primary key default gen_random_uuid(),
  feedback_id uuid not null references public.feedback_submissions(id) on delete cascade,
  event_type public.feedback_event_type not null,
  actor_role text,
  actor_id text,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_feedback_events_feedback_created
  on public.feedback_events (feedback_id, created_at desc);

create table if not exists public.feedback_notes (
  id uuid primary key default gen_random_uuid(),
  feedback_id uuid not null references public.feedback_submissions(id) on delete cascade,
  author_id uuid not null references public.usuarios(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_feedback_notes_feedback_created
  on public.feedback_notes (feedback_id, created_at desc);

drop trigger if exists trg_feedback_submissions_public_id on public.feedback_submissions;
create trigger trg_feedback_submissions_public_id
before insert on public.feedback_submissions
for each row execute function public.set_public_id('FDB');

do $$
begin
  if exists (
    select 1
    from pg_proc
    where proname = 'touch_updated_at'
      and pronamespace = 'public'::regnamespace
  ) then
    execute 'drop trigger if exists trg_feedback_submissions_touch_updated_at on public.feedback_submissions';
    execute 'create trigger trg_feedback_submissions_touch_updated_at before update on public.feedback_submissions for each row execute function public.touch_updated_at()';
    execute 'drop trigger if exists trg_feedback_notes_touch_updated_at on public.feedback_notes';
    execute 'create trigger trg_feedback_notes_touch_updated_at before update on public.feedback_notes for each row execute function public.touch_updated_at()';
  end if;
end $$;

alter table public.intake_guard_events enable row level security;
alter table public.feedback_submissions enable row level security;
alter table public.feedback_events enable row level security;
alter table public.feedback_notes enable row level security;

drop policy if exists intake_guard_events_admin_select on public.intake_guard_events;
create policy intake_guard_events_admin_select on public.intake_guard_events
  for select to authenticated
  using (public.is_admin());

drop policy if exists feedback_submissions_admin_select on public.feedback_submissions;
create policy feedback_submissions_admin_select on public.feedback_submissions
  for select to authenticated
  using (public.is_admin());

drop policy if exists feedback_submissions_admin_insert on public.feedback_submissions;
create policy feedback_submissions_admin_insert on public.feedback_submissions
  for insert to authenticated
  with check (public.is_admin());

drop policy if exists feedback_submissions_admin_update on public.feedback_submissions;
create policy feedback_submissions_admin_update on public.feedback_submissions
  for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists feedback_events_admin_select on public.feedback_events;
create policy feedback_events_admin_select on public.feedback_events
  for select to authenticated
  using (public.is_admin());

drop policy if exists feedback_events_admin_insert on public.feedback_events;
create policy feedback_events_admin_insert on public.feedback_events
  for insert to authenticated
  with check (public.is_admin());

drop policy if exists feedback_notes_admin_select on public.feedback_notes;
create policy feedback_notes_admin_select on public.feedback_notes
  for select to authenticated
  using (public.is_admin());

drop policy if exists feedback_notes_admin_insert on public.feedback_notes;
create policy feedback_notes_admin_insert on public.feedback_notes
  for insert to authenticated
  with check (public.is_admin());

drop policy if exists feedback_notes_admin_update on public.feedback_notes;
create policy feedback_notes_admin_update on public.feedback_notes
  for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());
