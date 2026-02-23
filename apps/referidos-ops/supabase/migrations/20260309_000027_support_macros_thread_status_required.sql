-- 20260309_000027_support_macros_thread_status_required.sql
-- Fuerza thread_status obligatorio en OPS y migra datos legacy sin estado.

begin;

-- Normaliza titulos legacy quitando prefijo de categoria: "Categoria - Titulo" -> "Titulo".
update public.support_macros
set title = trim(regexp_replace(title, E'^\\s*[^-]+\\s*-\\s*', ''))
where code like 'legacy_runtime_%'
  and title ~ E'^\\s*[^-]+\\s*-\\s*.+$';

update public.support_macros
set thread_status = 'new'
where thread_status is null
   or length(trim(thread_status)) = 0;

alter table public.support_macros
  drop constraint if exists support_macros_thread_status_check;

alter table public.support_macros
  alter column thread_status set default 'new';

alter table public.support_macros
  alter column thread_status set not null;

alter table public.support_macros
  add constraint support_macros_thread_status_check
  check (thread_status in ('new', 'assigned', 'in_progress', 'waiting_user', 'queued', 'closed', 'cancelled'));

commit;
