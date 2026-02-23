-- 20260309_000031_support_macros_cache_thread_status_required.sql
-- Runtime cache: fuerza thread_status obligatorio para macros sincronizados.

begin;

-- Normaliza titulos legacy cache quitando prefijo de categoria: "Categoria - Titulo" -> "Titulo".
update public.support_macros_cache
set title = trim(regexp_replace(title, E'^\\s*[^-]+\\s*-\\s*', ''))
where code like 'legacy_runtime_%'
  and title ~ E'^\\s*[^-]+\\s*-\\s*.+$';

update public.support_macros_cache
set thread_status = 'new'
where thread_status is null
   or length(trim(thread_status)) = 0;

alter table public.support_macros_cache
  drop constraint if exists support_macros_cache_thread_status_check;

alter table public.support_macros_cache
  alter column thread_status set default 'new';

alter table public.support_macros_cache
  alter column thread_status set not null;

alter table public.support_macros_cache
  add constraint support_macros_cache_thread_status_check
  check (thread_status in ('new', 'assigned', 'in_progress', 'waiting_user', 'queued', 'closed', 'cancelled'));

commit;
