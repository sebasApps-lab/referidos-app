-- 20260323_000037_support_macros_starting_thread_status.sql
-- OPS hub: habilita thread_status = 'starting' para macros.

begin;

update public.support_macros
set thread_status = 'new'
where thread_status is null
   or length(trim(thread_status)) = 0;

alter table public.support_macros
  drop constraint if exists support_macros_thread_status_check;

alter table public.support_macros
  add constraint support_macros_thread_status_check
  check (thread_status in ('new', 'starting', 'assigned', 'in_progress', 'waiting_user', 'queued', 'closed', 'cancelled'));

commit;

