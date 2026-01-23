alter table public.support_user_logs
  add column if not exists request_id text,
  add column if not exists session_id text,
  add column if not exists route text,
  add column if not exists screen text,
  add column if not exists app_version text,
  add column if not exists device text,
  add column if not exists network text,
  add column if not exists flow text,
  add column if not exists flow_step text,
  add column if not exists thread_id uuid references public.support_threads(id) on delete set null,
  add column if not exists user_agent text,
  add column if not exists ip_hash text,
  add column if not exists fingerprint text,
  add column if not exists context_extra jsonb default '{}'::jsonb,
  add column if not exists received_at timestamptz default now();

create index if not exists idx_support_user_logs_request
  on public.support_user_logs (request_id);

create index if not exists idx_support_user_logs_category_created
  on public.support_user_logs (category, created_at desc);

create index if not exists idx_support_user_logs_level_created
  on public.support_user_logs (level, created_at desc);

create index if not exists idx_support_user_logs_thread_created
  on public.support_user_logs (thread_id, created_at desc);

create index if not exists idx_support_user_logs_fingerprint_created
  on public.support_user_logs (fingerprint, created_at desc);
