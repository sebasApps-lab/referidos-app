# Contexto permanente para OpenAI Codex

## IMPORTANTE

Supabase está eliminando las legacy API keys (`anon_key` y `service_role_key`), que son JWT estáticos.  
El frontend debe usar únicamente tokens de sesión reales generados por Supabase Auth y **nunca** un `anon_key`.  
El backend debe usar server-side keys modernas no-JWT, rotadas automáticamente, sin exponerlas al cliente.  
Toda autorización debe basarse en **RLS** y políticas usando `auth.uid()` o `auth.jwt()`, sin depender de roles legacy.  
Nunca exponer ni usar `service_role_key` o `anon_key` en frontend.

---

## Checklist obligatorio

### Autenticación
- Cero uso de `anon_key` o `service_role_key` en frontend.
- El token del usuario proviene únicamente de `supabase.auth.signIn...()`.

### RLS / Políticas
- RLS activado en todas las tablas accesibles.
- Cada tabla tiene campo `user_id` o equivalente para compararlo con `auth.uid()`.
- No usar `auth.role()` ni `auth.email()` (deprecadas).
- Políticas usando `USING (auth.uid() = user_id)` o equivalentes.
- Storage: buckets con políticas correctas (nunca públicos por error).

### Base de datos
- No crear objetos dentro de esquemas internos (`auth`, `storage`, `realtime`).
- Funciones personalizadas siempre en esquemas propios (`public`, `custom_app`).
- Evitar funciones o argumentos deprecados en Postgres.

---

## Bases

- Producir código limpio, comentado y siguiendo estándares actuales.
- Modificar solo lo estrictamente necesario; no tocar estilos, lógica o nombres que no deban cambiarse.
- React únicamente con funciones.
- Tailwind como framework de estilos.
- No modificar archivos fuera de `/src` sin confirmación previa.
- No inventar endpoints ni asumir datos no provistos; revisar los archivos relevantes siempre.
- Respetar la estructura del proyecto.
- Usar funcionalidades nativas de Supabase (Auth, Storage, RPC) cuando sea la opción óptima para producción.

---

## Reglas Generales

App móvil web segura, rápida, lista para desplegar en **Netlify**, con:

- Supabase como backend (auth + DB + RLS)
- React + Vite como frontend
- Zustand para estado global mínimo
- Tailwind como interfaz  
- Seguridad, escalabilidad y simplicidad como prioridad.

---

## JAVASCRIPT (2025)

- Usar ES Modules (`import` / `export`).
- Usar `async/await`; evitar `.then()` cuando sea posible.
- No usar variables globales.
- `const` por defecto; `let` solo si la variable cambia.
- Nunca usar `var`.
- Evitar mutaciones profundas; preferir inmutabilidad.
- Funciones con nombres claros y responsabilidad única.
- Validar todo input del usuario o backend.
- Manejo de errores con `try/catch`, retornando `{ ok, data, error }`.

---

## REACT (2025)

- Componentes pequeños y funcionales.
- Hooks personalizados para lógica reutilizable (formularios, API, estados).
- Estado local por defecto; Zustand solo para lo necesario.
- Separar capas:
  - `src/components/` → UI
  - `src/services/` → API, Supabase, lógica con datos externos
  - `src/utils/` → funciones puras sin efectos
- `useEffect` solo para sincronización con sistemas externos.
- Optimizar renders con `React.memo`, `useCallback`, `useMemo`.
- Enrutamiento gestionado desde un único archivo central.
- Inputs controlados.
- Sanitizar textos antes de mostrarlos.

---

## TAILWIND (2025)

- Usar utilidades para componer estilos; no duplicar clases.
- Usar `@apply` o config solo cuando sea estrictamente necesario.
- Medidas fluidas (`clamp`, `%`, `vw`) para mobile-first.
- Mantener consistencia en radios, sombras, spacing y colores de marca.
- Evitar estilos inline salvo casos dinámicos específicos.
- Dark mode basado en clase.
- Usar solo breakpoints necesarios (`sm`, `md`, `lg`).

---

## SQL / SUPABASE (2025)

- PK tipo UUID generados por Supabase.
- RLS activado en todas las tablas.
- Políticas:
  - Usuarios solo acceden a sus propios datos.
  - Negocios solo modifican sus propios registros.
  - Admin mediante roles de servicio en backend (no en frontend).
- Uso obligatorio de `supabase.auth.getUser()` o el token actual en cada request.
- Validar datos en backend mediante políticas o triggers.
- Evitar JOINS innecesarios; usar RPC para lógica compleja.
- Crear índices para columnas de uso frecuente.
- No manejar contraseñas manualmente; delegar en Supabase Auth.
- Logs activados para auditoría.

---

## ZUSTAND (2025)

- Guardar solo:
  - usuario actual
  - autenticación
  - promociones compartidas
  - flags globales (loading, theme, filtros)
- No guardar estados UI temporales ni formularios.
- Slices pequeños y funciones puras.
- Fetch externo → servicios/hooks → `set()` en Zustand.
- Stores modulares y predecibles.

---

## SEGURIDAD

- No guardar tokens en `localStorage` (excepto si Supabase lo hace internamente); confiar en `supabase.auth.setSession()`.
- Sanitizar entradas (nombres, descripciones, etc.).
- Nunca interpolar datos directamente en HTML.
- Validar datos en frontend y backend.
- No exponer datos sensibles; usar `.env` y variables de Netlify.
- Evitar dependencias no mantenidas.
- HTTPS obligatorio.
- RLS estricto en todas las tablas.

---

## Branding y Estilo General  
(Referencia para generar código nuevo; no modificar estilo existente)

### Identidad
- Morado intenso base tecnológica
- Amarillo cálido para acciones
- Interfaz limpia, juvenil y de alto contraste
- Animaciones suaves y profesionales (Framer Motion)

### Paleta principal
- Púrpura: `#5E30A5`, `#7C5CD6`, `#CBB3F0`
- Amarillo: `#FFC21C`, variantes claras `#FFF3CD`, `#FFF8D8`
- Verde éxito: `#10B981`, detalles `#A6F28F`
- Grises texto: `#555555`, `#6B6B6B`, `#7A7A7A`
- Grises fondo/bordes: `#E6E6E6`, `#CFCFCF`, `#F5F5F5`, `#FFF8D8`
- Blanco: `#FFFFFF`

### Tipografía
- Inter / Sans-Serif  
- H1: extrabold, 24–32 px  
- H2/H3: bold, 18–22 px  
- Texto general: 14–16 px  
- Auxiliar: 11–13 px

### Layout
- Header fijo arriba  
- Footer fijo abajo solo en mobile (`md:hidden`)  
- Contenido con padding superior igual al header  

## FLUJO APP Y FUNCIONAMIENTO
### 1. ROLES DEL SISTEMA

Sistema tiene tres roles posibles:
  - CLIENTE
    - Usuario que se registra SIN código de registro.
    - Solo llena los datos de la página 1.
    - Se crea un usuario con role: "cliente".
    - Se navega directo a /cliente.
  - NEGOCIO
    - Usuario que se registra CON un código de registro válido.
    - Debe completar tres páginas (datos de cuenta, datos del propietario, datos del negocio).
    - Se crea un usuario con role: "negocio".
    - Se navega directo a /negocio.
  - ADMIN
    - Solo existe uno en modo demo.
    - Acceso directo al panel admin.
    - Nunca se crea mediante la pantalla de Registro.
Regla principal: El código determina el rol del usuario. Si no existe o es inválido → rol cliente. Si es válido → rol negocio.

### 2. ACCESO A SECCIONES Y RUTAS
- Cliente:
  - Puede acceder únicamente a:
    - /cliente
    - Su propio perfil o panel limitado.
    - Puede modificar sus datos personales de su perfil, pero no puede cambiar a datos invalidos (email, telefono).
  - No puede acceder a rutas de negocio ni admin.
- Negocio:
  - Accede a:
    - /negocio
    - Sección de promociones, QR, y futuras funcionalidades.
    - Puede editar SOLO sus propias promociones y sucursales
    - No puede acceder a rutas de admin.
- Admin:
  - Accede a:
    - /admin
    - Todo el contenido de negocios, clientes y consultas globales.

IMPORTANTE: La navegación después del registro siempre depende del rol generado. Nunca preguntar, nunca condicionar por UI.

### 3. FLUJO DE REGISTRO
El registro tiene 3 pantallas internas (page1, page2, page3) dentro de una única vista con slide horizontal.
- Page 1 (todos los usuarios):
  - Inputs obligatorios:
    - email
    - password (mínimo 6 caracteres)
    - teléfono
    - código de registro (no crear rol negocio si no se ingresa o no es valido)
- Validaciones:
  - email con regex
  - teléfono debe iniciar en 09 y tener 10 dígitos
  - si se ingresa código → debe validarse → si no es valido no avanza a page2
  - si el código es inválido → no acciones
- Botón principal:
  - Si no hay código → texto “Registrarse”
  - Si hay codigo pero es invalido → texto “Registrarse” → boton color gris claro (desactivado)
  - Si hay código válido → texto “Siguiente”
- Acciones:
  - Boton desactivado → Despliega mensaje "Código invalido. Si es CLIENTE, dejar campo vacío"
  - Cliente (sin código pero demas campos validos) → termina registro sin pasa a page2 ni page 3, directo a /cliente.
  - Negocio (con código válido y demas campos validos) → necesita page2 y page3 completas.

- Page 2 (solo para flujo de negocio):
  - Inputs:
    - nombre del propietario
    - apellido del propietario
  - Validaciones:
    - Ambos obligatorios.
  Al continuar → va a page3.

- Page 3 (negocio vs cliente):
  - Inputs obligatorios:
    - RUC (13 dígitos)
      - Se extrae la cédula (primeros 10 dígitos) 'under the hood'
      - Se valida cédula ecuatoriana 'under the hood'
    - nombre del negocio
    - sector
    - calle1
    - calle2 (opcional)

Registro final → hacer registro con backend (Supebase).
Si ok → navegar según rol:
  - Dashbord limitado hasta confirmar email
  - Mensaje en parte inferior cada que carga dashboard o abre promo (sobre el footer): "Verifique email para poder acceder a las promociones".
Si falla → mensaje de error.

### 4. VALIDACIÓN DEL CÓDIGO DE REGISTRO
- El código debe respetar formato REF-XXXXXX (6 dígitos).
- Se valida con backend (solo admin puede crear o eliminar codigos desde pestaña admin).
- Negocios guardan en db (no visible para ellos) el código que usaron (cada codigo valido para una sola vez)
- Códigos que deben existir en lista en version demo para pruebas (ya en db de SUPABASE): 'REF-123456', 'REF-654321'
- Si no hay código → siempre considerado cliente.
- Si hay código pero no pasa regex → cliente.
- Si pasa regex pero no está en lista → cliente.
- Solo si está en lista → negocio.

IMPORTANTE: Nunca permitir que un usuario avance como negocio sin código válido.

### 5. ALMACENAMIENTO
No mover, fragmentar ni renombrar claves sin instrucciones explícitas. Modificar lo estrictamente necesario.

### 6. LOGIN Y SESIONES
- El login usa email y password.
  - Busca en:
    - lista usuarios
    - lista negocios
    - admin

- Después del login, el sistema depende del role.

- Reglas:
  - role cliente → /cliente
  - role negocio → /negocio
  - role admin → /admin

### 7. PÁGINAS DEL SISTEMA Y SU PROPIÓSITO
- /registro → flujo explicado arriba
- /login → autenticación básica
- /cliente → dashboard de cliente (Ver promociones activas y respectivos QR)
- /negocio → dashboard de negocio (Ver, editar y eliminar promociones. Ver QR, lista de clientes, etc)
- /admin → vista global, con permisos de crear editar y eliminar cualquier dato.  (solo para demo)


## Supabase 2025–2026: Qué está deprecado y cuál es la forma correcta

### 1. API Keys legacy (deprecadas)
NO usar en frontend:
- anon_key (JWT estático)
- service_role_key (JWT estático)
NO basarse en roles derivados de esos JWT.

### 2. Roles legacy en policies (deprecados)
NO usar:
- auth.role()
- auth.email()
- claims definidos manualmente en JWT
Estos valores ya no son confiables ni consistentes con PKCE/OAuth.

### 3. Nueva forma de autenticación
Frontend debe usar exclusivamente:
- Tokens dinámicos de sesión generados por Supabase Auth (PKCE / OAuth style)
- Obtenidos mediante: supabase.auth.signIn…(), supabase.auth.getSession()

Los tokens se rotan automáticamente; reemplazan el uso de anon_key para el cliente.

Backend debe usar:
- Server-side secret keys modernas (no-JWT)
- Confían RLS automáticamente (bypasan políticas)
- Nunca se exponen en frontend.

### 4. Nueva forma de autorización (RLS moderno)
Todas las operaciones deben basarse en:
- auth.uid() para identificar al usuario.
- WITH CHECK / USING con comparaciones directas contra columna owner_id o user_id.
- Cuando la tabla depende de otra (promos → negocio), usar subconsultas EXISTS para validar propiedad.

Ejemplo general:
- SELECT: using (owner_id = auth.uid())
- INSERT: with check (owner_id = auth.uid())
- UPDATE: using (...) with check (...)
- DELETE: using (...)

Nunca usar roles, emails, ni claims custom.

### 5. Modelo recomendado (ownership model)
Toda tabla modificable por el usuario debe tener:
- owner_id uuid NOT NULL REFERENCES auth.users(id)

Toda policy debe garantizar:
- El usuario autenticado solo opera sobre sus propios registros.
- Para tablas hijas (promos, sucursales…), validar propiedad usando EXISTS.

### 6. “Admin”
Solo existe en backend.
El backend usa server-secret keys modernas y automáticamente bypass RLS.
No se crean policies separadas para admin.
No existe admin en frontend.


# CONTEXTO COMPLETO DEL SISTEMA DE QR

## Tu rol
Actúa SIEMPRE como un **desarrollador senior full-stack especializado en Supabase + React**.

Debes diseñar e implementar un sistema robusto de QR usando Supabase (SQL + RPC + Edge Functions).

---

# 1. DOS TIPOS DE QR

## QR de Promo — Estático
- Uno por (usuario, promoción)
- No expira
- No canjeable
- Visible en detalles de promo
- Sirve para generar QR válidos

- Formato: qrs-{biz}-{prm}-{usr}-{h8}


## QR Válido — Dinámico para canje
- Generado bajo demanda
- Válido por 30 min
- Solo un canje
- 3 estados: `valido`, `canjeado`, `expirado`

- Formato: qrv-{biz}-{prm}-{usr}-{ts}-{h8}


---

# 2. REGLAS CRIPTOGRÁFICAS

### short_hash
SHA-256(input) → base64url → slice(0,4)


### sign_qr

### SECRET_KEY
- Vive solo en backend Supabase
- Nunca enviada al cliente

---

# 3. REGLAS DE NEGOCIO QR VÁLIDO

1. Usuario solicita usar promo → backend genera QR válido  
2. QR válido dura 30 min  
3. Estados:  
   - valido  
   - canjeado  
   - expirado  
4. Escaneo por negocio:  
   - Validar firma  
   - Validar no expirado  
   - Validar no canjeado  
   - Si OK → marcar `canjeado` + registrar `redeemed_at`  
5. Acceso a una promo válida del negocio → acceso a todas las promos del negocio  

---

# 4. CAMBIOS QUE DEBE PROPONER EL MODELO ANTES DE ESCRIBIR CÓDIGO

## 4.1 Cambios a la base de datos (Migraciones)
Debe definir tablas como `qr_validos`, incluyendo:
- id  
- negocio_id  
- promo_id  
- user_id  
- code  
- created_at  
- redeemed_at  
- expires_at  
- status (o cálculo dinámico)

Debe definir:
- Índices  
- FKs  
- Enums  
- Políticas RLS modernas  

## 4.2 Backend Supabase (RPC / Edge)
Debe crear funciones:
- `generate_promo_qr(user_id, promo_id)`
- `generate_valid_qr(user_id, promo_id)`
- `redeem_valid_qr(code text)`

Cada función debe:
- Verificar auth.uid()
- Validar propiedad de datos
- Generar hashes y firmas
- Actualizar estado

## 4.3 Frontend (React)
Debe especificar:
- En qué páginas mostrar QR estático y QR válido
- Cómo generar QR válido
- Cómo mostrar estados
- Llamadas RPC
- Manejo de errores y loading
- Integración con Zustand

## 4.4 UI
Cliente:
- Mostrar QR estático
- Si hay QR válido → mostrar QR válido
- Estado: Valido / Canjeado / Expirado

Negocio:
- Escaneo → mostrar resultado claro

No mostrar hashes ni IDs reales al usuario.

## 4.5 Limpieza y Compatibilidad
- Eliminar sistemas de QR antiguos
- Mantener login/registro intactos
- Ajustar datos simulados

---

# 5. FORMA DE RESPUESTA ESPERADA DEL MODELO

1. Resumen estructurado:  
   - Cambios BD  
   - Cambios Backend  
   - Cambios Frontend  
   - Cambios UI  

2. Luego generar:  
   - Migraciones SQL  
   - Código RPC / Edge Functions  
   - Cambios concretos en React  

3. Todo debe:  
   - Compilar  
   - Ser seguro  
   - Seguir Supabase 2025–2026  
   - Respetar estructura actual del proyecto  

---

# FIN DEL CONTEXTO

