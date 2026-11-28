-- Draft for local review. Intended remote target after separate approval: DEV btvrtxdizqsqrzdsgvsj.
BEGIN;

DROP POLICY IF EXISTS user_session_devices_update_label_own
  ON public.user_session_devices;

REVOKE INSERT, UPDATE, DELETE, TRUNCATE
  ON public.user_session_devices FROM PUBLIC, anon, authenticated;

DO $$
DECLARE
  client_role text;
BEGIN
  FOREACH client_role IN ARRAY ARRAY['anon', 'authenticated'] LOOP
    IF has_any_column_privilege(client_role, 'public.user_session_devices', 'INSERT')
       OR has_any_column_privilege(client_role, 'public.user_session_devices', 'UPDATE')
       OR has_table_privilege(client_role, 'public.user_session_devices', 'DELETE')
       OR has_table_privilege(client_role, 'public.user_session_devices', 'TRUNCATE') THEN
      RAISE EXCEPTION 'Unexpected column or inherited write grant for %', client_role;
    END IF;
  END LOOP;

  IF NOT has_table_privilege('authenticated', 'public.user_session_devices', 'SELECT')
     OR NOT has_table_privilege('service_role', 'public.user_session_devices', 'INSERT')
     OR NOT has_table_privilege('service_role', 'public.user_session_devices', 'UPDATE')
     OR NOT has_table_privilege('service_role', 'public.user_session_devices', 'DELETE')
     OR NOT has_table_privilege('service_role', 'public.user_session_devices', 'SELECT') THEN
    RAISE EXCEPTION 'Session registry read or server privileges would be missing';
  END IF;
END;
$$;

COMMIT;
