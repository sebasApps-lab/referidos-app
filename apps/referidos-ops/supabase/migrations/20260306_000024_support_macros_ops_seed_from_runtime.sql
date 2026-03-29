-- 20260306_000024_support_macros_ops_seed_from_runtime.sql
-- Replica en OPS los macros legacy sembrados en runtime por:
-- apps/referidos-app/supabase/migrations/20250309_000003_support_system.sql

begin;

do $$
declare
  v_tenant_id uuid;
  v_missing_categories text;
begin
  select public.support_macro_default_tenant_id('ReferidosAPP')
    into v_tenant_id;

  if v_tenant_id is null then
    raise exception 'No se encontro tenant para seed de macros en OPS.';
  end if;

  with seed(ord, title, body, category_code, thread_status, audience_roles) as (
    values
      (10, 'Bienvenida', 'Hola, gracias por escribirnos. Ya estoy revisando tu caso y te confirmo en un momento.', null, 'new', '{cliente,negocio}'::text[]),
      (20, 'Confirmacion de recepcion', 'Recibi tu solicitud. En breve te confirmo los siguientes pasos.', null, 'new', '{cliente,negocio}'::text[]),
      (30, 'Tomando el caso', 'Ya tengo tu caso asignado. Empiezo a revisarlo ahora mismo.', null, 'assigned', '{cliente,negocio}'::text[]),
      (40, 'Solicitar pasos', 'Para ayudarte mejor: 1) pasos exactos, 2) pantalla, 3) mensaje de error si aparece.', null, 'in_progress', '{cliente,negocio}'::text[]),
      (50, 'Solicitar evidencia', 'Si puedes, envia una captura o video corto del problema.', null, 'in_progress', '{cliente,negocio}'::text[]),
      (60, 'Esperando respuesta', 'Quedo atento a tu respuesta para continuar con el caso.', null, 'waiting_user', '{cliente,negocio}'::text[]),
      (70, 'Caso en cola', 'Tu caso quedo en cola. Te escribo apenas lo retome.', null, 'queued', '{cliente,negocio}'::text[]),
      (80, 'Reanudado', 'Gracias por responder. Retomo tu caso ahora mismo.', null, 'in_progress', '{cliente,negocio}'::text[]),
      (90, 'Cierre cordial', 'Hemos resuelto el caso. Si necesitas algo mas, escribe nuevamente.', null, 'closed', '{cliente,negocio}'::text[]),
      (100, 'Cierre por falta de respuesta', 'Cierro el caso por falta de respuesta. Si lo necesitas, abre un nuevo ticket y retomamos.', null, 'closed', '{cliente,negocio}'::text[]),

      (110, 'Acceso - Restablecer contrasena', 'Si no puedes ingresar, usa "Olvide mi contrasena" en la pantalla de acceso y sigue el enlace.', 'acceso', 'in_progress', '{cliente,negocio}'::text[]),
      (120, 'Acceso - Correo no llega', 'Si no llega el correo, revisa spam/promociones y confirma que el correo este bien escrito.', 'acceso', 'in_progress', '{cliente,negocio}'::text[]),
      (130, 'Acceso - Bloqueo', 'Tu cuenta podria estar bloqueada por intentos fallidos. Confirma si recibiste algun aviso.', 'acceso', 'in_progress', '{cliente,negocio}'::text[]),
      (140, 'Acceso - Proveedor externo', 'Si usas Google/Apple, intenta ingresar con el mismo proveedor y no con correo y contrasena.', 'acceso', 'in_progress', '{cliente,negocio}'::text[]),

      (150, 'Verificacion - Correo', 'Te enviamos un enlace al correo registrado. Revisa tambien spam.', 'verificacion', 'in_progress', '{cliente,negocio}'::text[]),
      (160, 'Verificacion - Telefono', 'Confirma tu numero y el codigo recibido para completar la verificacion.', 'verificacion', 'in_progress', '{cliente,negocio}'::text[]),
      (170, 'Verificacion - RUC', 'Envia el RUC completo (13 digitos) y el nombre del negocio para validarlo.', 'verificacion', 'in_progress', '{negocio}'::text[]),

      (180, 'QR - Expirado', 'El QR puede estar expirado. Genera uno nuevo y vuelve a escanear.', 'qr', 'in_progress', '{cliente,negocio}'::text[]),
      (190, 'QR - No valida', 'Asegura buena luz, limpia la camara y evita reflejos antes de escanear.', 'qr', 'in_progress', '{cliente,negocio}'::text[]),
      (200, 'QR - Ya usado', 'Este QR ya fue canjeado. Confirma fecha y hora del canje.', 'qr', 'in_progress', '{cliente,negocio}'::text[]),
      (210, 'QR - Sucursal', 'Confirma la sucursal y el negocio donde intentaste canjear.', 'qr', 'in_progress', '{cliente,negocio}'::text[]),

      (220, 'Promos - No visible', 'La promo puede estar oculta o fuera de vigencia. Confirma el nombre exacto.', 'promos', 'in_progress', '{cliente,negocio}'::text[]),
      (230, 'Promos - Condiciones', 'Revisemos condiciones (horario, sucursal, requisitos). Envia el detalle.', 'promos', 'in_progress', '{cliente,negocio}'::text[]),
      (240, 'Promos - Canje fallido', 'Indica en que paso fallo el canje o si mostro algun error.', 'promos', 'in_progress', '{cliente,negocio}'::text[]),
      (250, 'Promos - Cupos', 'Algunas promos tienen cupos. Confirmo si ya se agotaron.', 'promos', 'in_progress', '{cliente,negocio}'::text[]),

      (260, 'Negocios - Datos', 'Confirma el nombre del negocio y la sucursal afectada para revisar el caso.', 'negocios_sucursales', 'in_progress', '{negocio}'::text[]),
      (270, 'Negocios - Horarios', 'Confirma horarios y zona para validar la configuracion.', 'negocios_sucursales', 'in_progress', '{negocio}'::text[]),
      (280, 'Negocios - Direccion', 'Si la direccion no aparece, verifica calle, canton y provincia.', 'negocios_sucursales', 'in_progress', '{negocio}'::text[]),
      (290, 'Negocios - Verificacion', 'La verificacion del negocio puede estar en revision. Te confirmo el estado.', 'negocios_sucursales', 'in_progress', '{negocio}'::text[]),

      (300, 'Pagos - Pendiente', 'Si el pago esta pendiente, comparte fecha y metodo utilizado.', 'pagos_plan', 'in_progress', '{negocio}'::text[]),
      (310, 'Pagos - Factura', 'Para factura, indica RUC y correo de facturacion.', 'pagos_plan', 'in_progress', '{negocio}'::text[]),
      (320, 'Plan - Upgrade', 'Confirma el plan actual y el plan solicitado para revisarlo.', 'pagos_plan', 'in_progress', '{negocio}'::text[]),
      (330, 'Plan - No aplicado', 'Si el plan no se refleja, comparteme el comprobante.', 'pagos_plan', 'in_progress', '{negocio}'::text[]),

      (340, 'Reporte - Recibido', 'Gracias por reportar. Revisaremos el contenido y te avisaremos el resultado.', 'reporte_abuso', 'in_progress', '{cliente,negocio}'::text[]),
      (350, 'Reporte - Detalle', 'Indica el contenido y el motivo para revisar el caso.', 'reporte_abuso', 'in_progress', '{cliente,negocio}'::text[]),

      (360, 'Bug - Datos tecnicos', 'Confirma version de app, dispositivo y pasos para reproducir.', 'bug_performance', 'in_progress', '{cliente,negocio}'::text[]),
      (370, 'Bug - Red', 'Si hay fallos de red, intenta con otra conexion y confirma el error.', 'bug_performance', 'in_progress', '{cliente,negocio}'::text[]),
      (380, 'Bug - Rendimiento', 'Indica en que pantalla ocurre la lentitud y si mejora al reiniciar.', 'bug_performance', 'in_progress', '{cliente,negocio}'::text[]),

      (390, 'Sugerencia - Gracias', 'Gracias por la sugerencia. La registramos para evaluacion.', 'sugerencia', 'in_progress', '{cliente,negocio}'::text[]),
      (400, 'Sugerencia - Detalle', 'Si puedes, detalla el beneficio o problema que resuelve.', 'sugerencia', 'in_progress', '{cliente,negocio}'::text[]),

      (410, 'Tier - Requisitos', 'Para activar beneficios, completa perfil, agrega telefono y verifica correo.', 'tier_beneficios', 'in_progress', '{cliente}'::text[]),
      (420, 'Tier - Progreso', 'El avance se actualiza tras completar datos y confirmar correo. Puedo revisar tu estado.', 'tier_beneficios', 'in_progress', '{cliente}'::text[])
  ),
  missing as (
    select distinct s.category_code
    from seed s
    left join public.support_macro_categories c
      on c.tenant_id = v_tenant_id
     and c.code = s.category_code
    where s.category_code is not null
      and c.id is null
  )
  select string_agg(category_code, ', ' order by category_code)
    into v_missing_categories
  from missing;

  if v_missing_categories is not null then
    raise exception 'Faltan categorias para seed de macros OPS: %', v_missing_categories;
  end if;

  with seed(ord, title, body, category_code, thread_status, audience_roles) as (
    values
      (10, 'Bienvenida', 'Hola, gracias por escribirnos. Ya estoy revisando tu caso y te confirmo en un momento.', null, 'new', '{cliente,negocio}'::text[]),
      (20, 'Confirmacion de recepcion', 'Recibi tu solicitud. En breve te confirmo los siguientes pasos.', null, 'new', '{cliente,negocio}'::text[]),
      (30, 'Tomando el caso', 'Ya tengo tu caso asignado. Empiezo a revisarlo ahora mismo.', null, 'assigned', '{cliente,negocio}'::text[]),
      (40, 'Solicitar pasos', 'Para ayudarte mejor: 1) pasos exactos, 2) pantalla, 3) mensaje de error si aparece.', null, 'in_progress', '{cliente,negocio}'::text[]),
      (50, 'Solicitar evidencia', 'Si puedes, envia una captura o video corto del problema.', null, 'in_progress', '{cliente,negocio}'::text[]),
      (60, 'Esperando respuesta', 'Quedo atento a tu respuesta para continuar con el caso.', null, 'waiting_user', '{cliente,negocio}'::text[]),
      (70, 'Caso en cola', 'Tu caso quedo en cola. Te escribo apenas lo retome.', null, 'queued', '{cliente,negocio}'::text[]),
      (80, 'Reanudado', 'Gracias por responder. Retomo tu caso ahora mismo.', null, 'in_progress', '{cliente,negocio}'::text[]),
      (90, 'Cierre cordial', 'Hemos resuelto el caso. Si necesitas algo mas, escribe nuevamente.', null, 'closed', '{cliente,negocio}'::text[]),
      (100, 'Cierre por falta de respuesta', 'Cierro el caso por falta de respuesta. Si lo necesitas, abre un nuevo ticket y retomamos.', null, 'closed', '{cliente,negocio}'::text[]),

      (110, 'Acceso - Restablecer contrasena', 'Si no puedes ingresar, usa "Olvide mi contrasena" en la pantalla de acceso y sigue el enlace.', 'acceso', 'in_progress', '{cliente,negocio}'::text[]),
      (120, 'Acceso - Correo no llega', 'Si no llega el correo, revisa spam/promociones y confirma que el correo este bien escrito.', 'acceso', 'in_progress', '{cliente,negocio}'::text[]),
      (130, 'Acceso - Bloqueo', 'Tu cuenta podria estar bloqueada por intentos fallidos. Confirma si recibiste algun aviso.', 'acceso', 'in_progress', '{cliente,negocio}'::text[]),
      (140, 'Acceso - Proveedor externo', 'Si usas Google/Apple, intenta ingresar con el mismo proveedor y no con correo y contrasena.', 'acceso', 'in_progress', '{cliente,negocio}'::text[]),

      (150, 'Verificacion - Correo', 'Te enviamos un enlace al correo registrado. Revisa tambien spam.', 'verificacion', 'in_progress', '{cliente,negocio}'::text[]),
      (160, 'Verificacion - Telefono', 'Confirma tu numero y el codigo recibido para completar la verificacion.', 'verificacion', 'in_progress', '{cliente,negocio}'::text[]),
      (170, 'Verificacion - RUC', 'Envia el RUC completo (13 digitos) y el nombre del negocio para validarlo.', 'verificacion', 'in_progress', '{negocio}'::text[]),

      (180, 'QR - Expirado', 'El QR puede estar expirado. Genera uno nuevo y vuelve a escanear.', 'qr', 'in_progress', '{cliente,negocio}'::text[]),
      (190, 'QR - No valida', 'Asegura buena luz, limpia la camara y evita reflejos antes de escanear.', 'qr', 'in_progress', '{cliente,negocio}'::text[]),
      (200, 'QR - Ya usado', 'Este QR ya fue canjeado. Confirma fecha y hora del canje.', 'qr', 'in_progress', '{cliente,negocio}'::text[]),
      (210, 'QR - Sucursal', 'Confirma la sucursal y el negocio donde intentaste canjear.', 'qr', 'in_progress', '{cliente,negocio}'::text[]),

      (220, 'Promos - No visible', 'La promo puede estar oculta o fuera de vigencia. Confirma el nombre exacto.', 'promos', 'in_progress', '{cliente,negocio}'::text[]),
      (230, 'Promos - Condiciones', 'Revisemos condiciones (horario, sucursal, requisitos). Envia el detalle.', 'promos', 'in_progress', '{cliente,negocio}'::text[]),
      (240, 'Promos - Canje fallido', 'Indica en que paso fallo el canje o si mostro algun error.', 'promos', 'in_progress', '{cliente,negocio}'::text[]),
      (250, 'Promos - Cupos', 'Algunas promos tienen cupos. Confirmo si ya se agotaron.', 'promos', 'in_progress', '{cliente,negocio}'::text[]),

      (260, 'Negocios - Datos', 'Confirma el nombre del negocio y la sucursal afectada para revisar el caso.', 'negocios_sucursales', 'in_progress', '{negocio}'::text[]),
      (270, 'Negocios - Horarios', 'Confirma horarios y zona para validar la configuracion.', 'negocios_sucursales', 'in_progress', '{negocio}'::text[]),
      (280, 'Negocios - Direccion', 'Si la direccion no aparece, verifica calle, canton y provincia.', 'negocios_sucursales', 'in_progress', '{negocio}'::text[]),
      (290, 'Negocios - Verificacion', 'La verificacion del negocio puede estar en revision. Te confirmo el estado.', 'negocios_sucursales', 'in_progress', '{negocio}'::text[]),

      (300, 'Pagos - Pendiente', 'Si el pago esta pendiente, comparte fecha y metodo utilizado.', 'pagos_plan', 'in_progress', '{negocio}'::text[]),
      (310, 'Pagos - Factura', 'Para factura, indica RUC y correo de facturacion.', 'pagos_plan', 'in_progress', '{negocio}'::text[]),
      (320, 'Plan - Upgrade', 'Confirma el plan actual y el plan solicitado para revisarlo.', 'pagos_plan', 'in_progress', '{negocio}'::text[]),
      (330, 'Plan - No aplicado', 'Si el plan no se refleja, comparteme el comprobante.', 'pagos_plan', 'in_progress', '{negocio}'::text[]),

      (340, 'Reporte - Recibido', 'Gracias por reportar. Revisaremos el contenido y te avisaremos el resultado.', 'reporte_abuso', 'in_progress', '{cliente,negocio}'::text[]),
      (350, 'Reporte - Detalle', 'Indica el contenido y el motivo para revisar el caso.', 'reporte_abuso', 'in_progress', '{cliente,negocio}'::text[]),

      (360, 'Bug - Datos tecnicos', 'Confirma version de app, dispositivo y pasos para reproducir.', 'bug_performance', 'in_progress', '{cliente,negocio}'::text[]),
      (370, 'Bug - Red', 'Si hay fallos de red, intenta con otra conexion y confirma el error.', 'bug_performance', 'in_progress', '{cliente,negocio}'::text[]),
      (380, 'Bug - Rendimiento', 'Indica en que pantalla ocurre la lentitud y si mejora al reiniciar.', 'bug_performance', 'in_progress', '{cliente,negocio}'::text[]),

      (390, 'Sugerencia - Gracias', 'Gracias por la sugerencia. La registramos para evaluacion.', 'sugerencia', 'in_progress', '{cliente,negocio}'::text[]),
      (400, 'Sugerencia - Detalle', 'Si puedes, detalla el beneficio o problema que resuelve.', 'sugerencia', 'in_progress', '{cliente,negocio}'::text[]),

      (410, 'Tier - Requisitos', 'Para activar beneficios, completa perfil, agrega telefono y verifica correo.', 'tier_beneficios', 'in_progress', '{cliente}'::text[]),
      (420, 'Tier - Progreso', 'El avance se actualiza tras completar datos y confirmar correo. Puedo revisar tu estado.', 'tier_beneficios', 'in_progress', '{cliente}'::text[])
  )
  insert into public.support_macros (
    tenant_id,
    category_id,
    code,
    title,
    body,
    thread_status,
    audience_roles,
    app_targets,
    env_targets,
    sort_order,
    status,
    metadata,
    created_by,
    updated_by
  )
  select
    v_tenant_id as tenant_id,
    c.id as category_id,
    'legacy_runtime_' || lpad(s.ord::text, 3, '0') as code,
    s.title,
    s.body,
    s.thread_status,
    s.audience_roles,
    coalesce(c.app_targets, '{all}'::text[]) as app_targets,
    '{all}'::text[] as env_targets,
    s.ord as sort_order,
    'published' as status,
    jsonb_build_object(
      'seed_source', 'runtime_migration_20250309_000003_support_system',
      'legacy_ord', s.ord
    ) as metadata,
    'migration:20260306_000024' as created_by,
    'migration:20260306_000024' as updated_by
  from seed s
  left join public.support_macro_categories c
    on c.tenant_id = v_tenant_id
   and c.code = s.category_code
  on conflict (tenant_id, code) do update
  set
    category_id = excluded.category_id,
    title = excluded.title,
    body = excluded.body,
    thread_status = excluded.thread_status,
    audience_roles = excluded.audience_roles,
    app_targets = excluded.app_targets,
    env_targets = excluded.env_targets,
    sort_order = excluded.sort_order,
    status = excluded.status,
    metadata = excluded.metadata,
    updated_by = excluded.updated_by,
    updated_at = now();
end $$;

commit;
