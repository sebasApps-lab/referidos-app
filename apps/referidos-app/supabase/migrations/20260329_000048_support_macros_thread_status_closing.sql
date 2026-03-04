-- 20260329_000048_support_macros_thread_status_closing.sql
-- Alinea estados permitidos de macros con flujo actual (starting/closing).

alter table if exists public.support_macros
  drop constraint if exists support_macros_thread_status_check;

alter table if exists public.support_macros
  add constraint support_macros_thread_status_check
  check (
    status is null
    or status::text in (
      'new',
      'starting',
      'assigned',
      'in_progress',
      'waiting_user',
      'queued',
      'closing',
      'closed',
      'cancelled'
    )
  );

update public.support_macros_cache
set thread_status = 'new'
where thread_status is null
   or length(trim(thread_status)) = 0;

alter table if exists public.support_macros_cache
  drop constraint if exists support_macros_cache_thread_status_check;

alter table if exists public.support_macros_cache
  alter column thread_status set default 'new';

alter table if exists public.support_macros_cache
  alter column thread_status set not null;

alter table if exists public.support_macros_cache
  add constraint support_macros_cache_thread_status_check
  check (
    thread_status in (
      'new',
      'starting',
      'assigned',
      'in_progress',
      'waiting_user',
      'queued',
      'closing',
      'closed',
      'cancelled'
    )
  );
