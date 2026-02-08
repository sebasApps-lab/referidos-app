alter table public.support_agent_profiles
  add column if not exists authorized_from timestamptz
  default (date_trunc('day', now()) + interval '8 hours');
