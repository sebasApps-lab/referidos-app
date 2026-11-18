# Paquetes compartidos · domain

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`packages/domain/src/auth/authRoles.js`](../../../packages/domain/src/auth/authRoles.js#L1)
- [`packages/domain/src/auth/authSteps.js`](../../../packages/domain/src/auth/authSteps.js#L1)
- [`packages/domain/src/auth/flowRules.js`](../../../packages/domain/src/auth/flowRules.js#L1)
- [`packages/domain/src/catalogs/businessCategories.js`](../../../packages/domain/src/catalogs/businessCategories.js#L1)
- [`packages/domain/src/index.js`](../../../packages/domain/src/index.js#L1)
- [`packages/domain/src/normalizers/phone.js`](../../../packages/domain/src/normalizers/phone.js#L1)
- [`packages/domain/src/normalizers/text.js`](../../../packages/domain/src/normalizers/text.js#L1)
- [`packages/domain/src/normalizers/userProfile.js`](../../../packages/domain/src/normalizers/userProfile.js#L1)
- [`packages/domain/src/validators/index.js`](../../../packages/domain/src/validators/index.js#L1)

## Símbolos y conexiones

### [`packages/domain/src/auth/authRoles.js`](../../../packages/domain/src/auth/authRoles.js#L1)

Constantes para roles del flujo de registro. Evita dispersar nombres en el cliente móvil.

**Superficie que exporta.** [`AUTH_ROLES`](../../../packages/domain/src/auth/authRoles.js#L1), [`APP_ROLES`](../../../packages/domain/src/auth/authRoles.js#L10).

**Módulos que lo cargan.** [`index.js`](../../../packages/domain/src/index.js#L2) (reexporta).

#### [`AUTH_ROLES`](../../../packages/domain/src/auth/authRoles.js#L1) · variable de módulo · exportado

Agrupa la configuración o catálogo de `AUTH ROLES` para que sus consumidores lean claves comunes.

- **Campos o contexto** `CLIENTE`, `NEGOCIO`, `ADMIN`, `SOPORTE`, `DEV`, `EMPLEADO`.
- **Lo usa** [`APP_ROLES`](../../../packages/domain/src/auth/authRoles.js#L10) (referencia), [`AuthFlowScreen`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L176) (accede al módulo), [`RoleButton.onPress`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L177) (accede al módulo), [`RoleButton.onPress`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L182) (accede al módulo), [`submitRoleSelection`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L469) (accede al módulo), [`submitOwnerProfile`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L503) (accede al módulo), [`submitBusinessData`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L567) (accede al módulo), [`submitAddressData`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L692) (accede al módulo), [`submitBusinessVerificationData`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L877) (accede al módulo).

#### [`APP_ROLES`](../../../packages/domain/src/auth/authRoles.js#L10) · variable de módulo · exportado

Declara `APP_ROLES` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- Abre el símbolo enlazado para ver su implementación. Las referencias estáticas de esta ficha se limitan a los usos observables.

### [`packages/domain/src/auth/authSteps.js`](../../../packages/domain/src/auth/authSteps.js#L1)

Constantes para el identificador de cada paso de auth y onboarding.

**Superficie que exporta.** [`AUTH_STEPS`](../../../packages/domain/src/auth/authSteps.js#L1), [`AUTH_FORM_STEPS`](../../../packages/domain/src/auth/authSteps.js#L23).

**Módulos que lo cargan.** [`flowRules.js`](../../../packages/domain/src/auth/flowRules.js#L1) (importa), [`index.js`](../../../packages/domain/src/index.js#L1) (reexporta).

#### [`AUTH_STEPS`](../../../packages/domain/src/auth/authSteps.js#L1) · variable de módulo · exportado

Agrupa la configuración o catálogo de `AUTH STEPS` para que sus consumidores lean claves comunes.

- **Campos o contexto** `WELCOME`, `EMAIL_LOGIN`, `EMAIL_REGISTER`, `OAUTH_CALLBACK`, `ROLE_SELECT`, `USER_PROFILE`, `BUSINESS_DATA`, `BUSINESS_CATEGORY`, `USER_ADDRESS`, `BUSINESS_VERIFY`, `ACCOUNT_VERIFY_PROMPT`, `ACCOUNT_VERIFY`, `VERIFY_EMAIL`, `ACCOUNT_VERIFY_METHOD` y 5 más.
- **Lo usa** [`AuthFlowScreen`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L75) (accede al módulo), [`PrimaryButton.onPress`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L90) (accede al módulo), [`SecondaryButton.onPress`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L94) (accede al módulo), [`SecondaryButton.onPress`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L111) (accede al módulo), [`SecondaryButton.onPress`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L134) (accede al módulo), [`SecondaryButton.onPress`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L167) (accede al módulo), [`useAuthEngine`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L90) (accede al módulo), [`completeOAuthCallback`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L133) (accede al módulo), [`useEffect · callback`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L263) (accede al módulo), [`startOAuth`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L405) (accede al módulo), [`resolveRegistrationStep`](../../../packages/domain/src/auth/flowRules.js#L33) (accede al módulo), [`resolveVerificationStep`](../../../packages/domain/src/auth/flowRules.js#L78) (accede al módulo).

#### [`AUTH_FORM_STEPS`](../../../packages/domain/src/auth/authSteps.js#L23) · variable de módulo · exportado

Agrupa la configuración o catálogo de `AUTH FORM STEPS` para que sus consumidores lean claves comunes.

- **Campos o contexto** `USER_PROFILE`, `BUSINESS`, `BUSINESS_CATEGORY`, `USER_ADDRESS`, `BUSINESS_VERIFY`, `ACCOUNT_VERIFY`, `ACCOUNT_VERIFY_PROMPT`, `VERIFY_EMAIL`, `ACCOUNT_VERIFY_METHOD`, `ACCOUNT_VERIFY_READY`, `ADD_PASSWORD`, `ADD_MFA`.

### [`packages/domain/src/auth/flowRules.js`](../../../packages/domain/src/auth/flowRules.js#L1)

Resuelve el siguiente paso a partir de rol, metadata y resultado de onboarding. Mantiene lógica de decisión fuera de la pantalla.

**Superficie que exporta.** [`hasReason`](../../../packages/domain/src/auth/flowRules.js#L3), [`getMissingFieldsFromReasons`](../../../packages/domain/src/auth/flowRules.js#L7), [`resolveClientPendingSteps`](../../../packages/domain/src/auth/flowRules.js#L17), [`resolveRegistrationStep`](../../../packages/domain/src/auth/flowRules.js#L31), [`resolveVerificationStep`](../../../packages/domain/src/auth/flowRules.js#L75).

**Módulos que lo cargan.** [`index.js`](../../../packages/domain/src/index.js#L3) (reexporta).

**Dependencias del archivo.** [`./authSteps.js`](../../../packages/domain/src/auth/authSteps.js).

#### [`hasReason`](../../../packages/domain/src/auth/flowRules.js#L3) · función · exportado

Comprueba `Reason` para decidir si se admite o continúa la operación.

- **Entradas** `reasons = valor por defecto`, `needle = valor por defecto`.
- **Llamadas directas en el cuerpo** [`reasons.some`](../../../packages/domain/src/auth/flowRules.js#L4), [`reason.startsWith`](../../../packages/domain/src/auth/flowRules.js#L4).
- **Lo usa** [`resolveRegistrationStep`](../../../packages/domain/src/auth/flowRules.js#L47) (llama).

#### [`getMissingFieldsFromReasons`](../../../packages/domain/src/auth/flowRules.js#L7) · función · exportado

Obtiene o resuelve `Missing Fields From Reasons` para entregarlo al consumidor.

- **Entradas** `reasons = valor por defecto`, `prefix`.
- **Retorno visible o tipo declarado** `lista`.
- **Condiciones que evalúa** `ausencia de found`.
- **Llamadas directas en el cuerpo** [`reasons.find`](../../../packages/domain/src/auth/flowRules.js#L8), [`reason.startsWith`](../../../packages/domain/src/auth/flowRules.js#L8), [`found.split`](../../../packages/domain/src/auth/flowRules.js#L10), [`filter`](../../../packages/domain/src/auth/flowRules.js#L11), [`map`](../../../packages/domain/src/auth/flowRules.js#L11), [`fields.split`](../../../packages/domain/src/auth/flowRules.js#L11), [`field.trim`](../../../packages/domain/src/auth/flowRules.js#L13).

#### [`resolveClientPendingSteps`](../../../packages/domain/src/auth/flowRules.js#L17) · función · exportado

Obtiene o resuelve `Client Pending Steps` para entregarlo al consumidor.

- **Entradas** `onboarding`.
- **Retorno visible o tipo declarado** `profilePending`, `addressPending`.
- **Lo usa** [`resolveRegistrationStep`](../../../packages/domain/src/auth/flowRules.js#L40) (llama).

#### [`resolveRegistrationStep`](../../../packages/domain/src/auth/flowRules.js#L31) · función · exportado

Obtiene o resuelve `Registration Step` para entregarlo al consumidor.

- **Entradas** `{onboarding, role}`.
- **Condiciones que evalúa** `ausencia de onboarding.ok`, `ausencia de onboarding.usuario o ausencia de role`, `role`, `clientSteps.profilePending`, `clientSteps.addressPending`, `ownerMissing`, `businessMissing`, `addressMissing` y 1 más.
- **Usa código de** [`AUTH_STEPS`](../../../packages/domain/src/auth/authSteps.js#L1) (accede al módulo).
- **Llamadas directas en el cuerpo** [`resolveClientPendingSteps`](../../../packages/domain/src/auth/flowRules.js#L40), [`hasReason`](../../../packages/domain/src/auth/flowRules.js#L47).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L279) (llama).

#### [`resolveVerificationStep`](../../../packages/domain/src/auth/flowRules.js#L75) · función · exportado

Obtiene o resuelve `Verification Step` para entregarlo al consumidor.

- **Entradas** `{onboarding, role}`.
- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `ausencia de onboarding.allowAccess`, `role`, `status`, `ausencia de emailConfirmed`, `ausencia de hasPassword o ausencia de hasMfa`.
- **Usa código de** [`AUTH_STEPS`](../../../packages/domain/src/auth/authSteps.js#L1) (accede al módulo).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L268) (llama), [`startVerification`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L812) (llama).

### [`packages/domain/src/catalogs/businessCategories.js`](../../../packages/domain/src/catalogs/businessCategories.js#L1)

Lista categorías semánticas que usan formularios de negocio y el motor móvil.

**Superficie que exporta.** [`BUSINESS_CATEGORIES`](../../../packages/domain/src/catalogs/businessCategories.js#L1), [`BUSINESS_SUBCATEGORIES`](../../../packages/domain/src/catalogs/businessCategories.js#L17), [`resolveCategoryPath`](../../../packages/domain/src/catalogs/businessCategories.js#L98).

**Módulos que lo cargan.** [`index.js`](../../../packages/domain/src/index.js#L8) (reexporta).

#### [`BUSINESS_CATEGORIES`](../../../packages/domain/src/catalogs/businessCategories.js#L1) · variable de módulo · exportado

Conserva la lista de `BUSINESS CATEGORIES` usada por el módulo.

- **Lo usa** [`resolveCategoryPath`](../../../packages/domain/src/catalogs/businessCategories.js#L102) (accede al módulo), [`AuthFlowScreen`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L216) (accede al módulo).

#### [`BUSINESS_SUBCATEGORIES`](../../../packages/domain/src/catalogs/businessCategories.js#L17) · variable de módulo · exportado

Agrupa la configuración o catálogo de `BUSINESS SUBCATEGORIES` para que sus consumidores lean claves comunes.

- **Campos o contexto** `restaurante`, `cafe`, `compras`, `farmacia`, `belleza`, `salud`, `fitness`, `deporte-recreacion`, `servicios-profesionales`, `tecnologia`, `mascotas`, `educacion`, `otras`.
- **Lo usa** [`resolveCategoryPath`](../../../packages/domain/src/catalogs/businessCategories.js#L105) (referencia).

#### [`resolveCategoryPath`](../../../packages/domain/src/catalogs/businessCategories.js#L98) · función · exportado

Obtiene o resuelve `Category Path` para entregarlo al consumidor.

- **Entradas** `value`.
- **Retorno visible o tipo declarado** `parentLabel`, `subLabel`.
- **Condiciones que evalúa** `ausencia de label`, `parent`, `list.includes`.
- **Llamadas directas en el cuerpo** [`trim`](../../../packages/domain/src/catalogs/businessCategories.js#L99), [`BUSINESS_CATEGORIES.find`](../../../packages/domain/src/catalogs/businessCategories.js#L102), [`list.includes`](../../../packages/domain/src/catalogs/businessCategories.js#L106).

### [`packages/domain/src/index.js`](../../../packages/domain/src/index.js#L1)

Expone públicamente pasos, roles, categorías, normalizadores y validadores.

**Reexporta.** `*` de [`authSteps.js`](../../../packages/domain/src/auth/authSteps.js), `*` de [`authRoles.js`](../../../packages/domain/src/auth/authRoles.js), `*` de [`flowRules.js`](../../../packages/domain/src/auth/flowRules.js), `*` de [`index.js`](../../../packages/domain/src/validators/index.js), `*` de [`text.js`](../../../packages/domain/src/normalizers/text.js), `*` de [`phone.js`](../../../packages/domain/src/normalizers/phone.js), `*` de [`userProfile.js`](../../../packages/domain/src/normalizers/userProfile.js), `*` de [`businessCategories.js`](../../../packages/domain/src/catalogs/businessCategories.js).

**Módulos que lo cargan.** [`AuthFlowScreen.tsx`](../../../apps/referidos-android/src/features/auth/AuthFlowScreen.tsx#L10) (importa), [`OwnerProfileStepBlock.tsx`](../../../apps/referidos-android/src/features/auth/blocks/OwnerProfileStepBlock.tsx#L3) (importa), [`useAuthEngine.ts`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L3) (importa), [`search.js`](../../../packages/api-client/src/address/search.js#L1) (importa).

El archivo participa como entrada, adaptador de imports o reexportación.

### [`packages/domain/src/normalizers/phone.js`](../../../packages/domain/src/normalizers/phone.js#L1)

Normaliza teléfonos para producir el formato esperado por el flujo.

**Superficie que exporta.** [`COUNTRY_CODES`](../../../packages/domain/src/normalizers/phone.js#L1), [`parsePhoneWithCountry`](../../../packages/domain/src/normalizers/phone.js#L14), [`normalizePhoneDigits`](../../../packages/domain/src/normalizers/phone.js#L33), [`isPhoneValidForCountry`](../../../packages/domain/src/normalizers/phone.js#L41), [`toStoragePhone`](../../../packages/domain/src/normalizers/phone.js#L47), [`toDisplayPhone`](../../../packages/domain/src/normalizers/phone.js#L53).

**Módulos que lo cargan.** [`index.js`](../../../packages/domain/src/index.js#L6) (reexporta).

#### [`COUNTRY_CODES`](../../../packages/domain/src/normalizers/phone.js#L1) · variable de módulo · exportado

Conserva la lista de `COUNTRY CODES` usada por el módulo.

- **Lo usa** [`parsePhoneWithCountry`](../../../packages/domain/src/normalizers/phone.js#L18) (accede al módulo).

#### [`onlyDigits`](../../../packages/domain/src/normalizers/phone.js#L10) · función

Maneja `ly Digits` y coordina las acciones indicadas abajo.

- **Entradas** `value = valor por defecto`.
- **Efectos y APIs** `replace`.
- **Llamadas directas en el cuerpo** [`replace`](../../../packages/domain/src/normalizers/phone.js#L11).
- **Lo usa** [`parsePhoneWithCountry`](../../../packages/domain/src/normalizers/phone.js#L20) (llama), [`normalizePhoneDigits`](../../../packages/domain/src/normalizers/phone.js#L34) (llama).

#### [`parsePhoneWithCountry`](../../../packages/domain/src/normalizers/phone.js#L14) · función · exportado

Extrae o interpreta `Phone With Country` de los argumentos, estado o datos de entrada.

- **Entradas** `phone = valor por defecto`.
- **Retorno visible o tipo declarado** `code`, `digits`.
- **Efectos y APIs** `digits.replace`.
- **Condiciones que evalúa** `ausencia de raw`, `found`, `digits.startsWith`.
- **Llamadas directas en el cuerpo** [`trim`](../../../packages/domain/src/normalizers/phone.js#L15), [`COUNTRY_CODES.find`](../../../packages/domain/src/normalizers/phone.js#L18), [`raw.startsWith`](../../../packages/domain/src/normalizers/phone.js#L18), [`onlyDigits`](../../../packages/domain/src/normalizers/phone.js#L20), [`raw.slice`](../../../packages/domain/src/normalizers/phone.js#L20), [`digits.startsWith`](../../../packages/domain/src/normalizers/phone.js#L24), [`digits.slice`](../../../packages/domain/src/normalizers/phone.js#L25), [`digits.replace`](../../../packages/domain/src/normalizers/phone.js#L28).
- **Lo usa** [`submitBusinessVerificationData`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L857) (llama).

#### [`normalizePhoneDigits`](../../../packages/domain/src/normalizers/phone.js#L33) · función · exportado

Normaliza `Phone Digits` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `code`, `digits`.
- **Efectos y APIs** `normalized.replace`.
- **Condiciones que evalúa** `code`.
- **Llamadas directas en el cuerpo** [`onlyDigits`](../../../packages/domain/src/normalizers/phone.js#L34), [`slice`](../../../packages/domain/src/normalizers/phone.js#L36), [`normalized.replace`](../../../packages/domain/src/normalizers/phone.js#L36).
- **Lo usa** [`isPhoneValidForCountry`](../../../packages/domain/src/normalizers/phone.js#L42) (llama), [`toStoragePhone`](../../../packages/domain/src/normalizers/phone.js#L49) (llama), [`toDisplayPhone`](../../../packages/domain/src/normalizers/phone.js#L55) (llama).

#### [`isPhoneValidForCountry`](../../../packages/domain/src/normalizers/phone.js#L41) · función · exportado

Comprueba `Phone Valid For Country` para decidir si se admite o continúa la operación.

- **Entradas** `code`, `digits`.
- **Condiciones que evalúa** `code`.
- **Llamadas directas en el cuerpo** [`normalizePhoneDigits`](../../../packages/domain/src/normalizers/phone.js#L42).
- **Lo usa** [`submitBusinessVerificationData`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L862) (llama).

#### [`toStoragePhone`](../../../packages/domain/src/normalizers/phone.js#L47) · función · exportado

Implementa `to Storage Phone` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `code`, `digits`.
- **Llamadas directas en el cuerpo** [`normalizePhoneDigits`](../../../packages/domain/src/normalizers/phone.js#L49).
- **Lo usa** [`submitBusinessVerificationData`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L866) (llama).

#### [`toDisplayPhone`](../../../packages/domain/src/normalizers/phone.js#L53) · función · exportado

Implementa `to Display Phone` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `code`, `digits`.
- **Condiciones que evalúa** `normalizedCode`, `ausencia de normalizedDigits`.
- **Llamadas directas en el cuerpo** [`normalizePhoneDigits`](../../../packages/domain/src/normalizers/phone.js#L55), [`base.slice`](../../../packages/domain/src/normalizers/phone.js#L59), [`trim`](../../../packages/domain/src/normalizers/phone.js#L62).

### [`packages/domain/src/normalizers/text.js`](../../../packages/domain/src/normalizers/text.js#L1)

Transformaciones reutilizables de texto para convertir entrada libre a forma consistente.

**Superficie que exporta.** [`toTitleCaseEs`](../../../packages/domain/src/normalizers/text.js#L23), [`normalizeLooseSearch`](../../../packages/domain/src/normalizers/text.js#L36).

**Módulos que lo cargan.** [`index.js`](../../../packages/domain/src/index.js#L5) (reexporta).

#### [`LOWER_WORDS`](../../../packages/domain/src/normalizers/text.js#L1) · variable de módulo

Declara `LOWER_WORDS` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`toTitleCaseEs`](../../../packages/domain/src/normalizers/text.js#L30) (accede al módulo).

#### [`capitalizeWord`](../../../packages/domain/src/normalizers/text.js#L18) · función

Implementa `capitalize Word` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `word`.
- **Condiciones que evalúa** `ausencia de word`.
- **Llamadas directas en el cuerpo** [`toUpperCase`](../../../packages/domain/src/normalizers/text.js#L20), [`word.charAt`](../../../packages/domain/src/normalizers/text.js#L20), [`toLowerCase`](../../../packages/domain/src/normalizers/text.js#L20), [`word.slice`](../../../packages/domain/src/normalizers/text.js#L20).
- **Lo usa** [`toTitleCaseEs`](../../../packages/domain/src/normalizers/text.js#L31) (llama).

#### [`toTitleCaseEs`](../../../packages/domain/src/normalizers/text.js#L23) · función · exportado

Implementa `to Title Case Es` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `text`.
- **Condiciones que evalúa** `ausencia de value`, `index y LOWER_WORDS.has`.
- **Llamadas directas en el cuerpo** [`trim`](../../../packages/domain/src/normalizers/text.js#L24), [`join`](../../../packages/domain/src/normalizers/text.js#L26), [`map`](../../../packages/domain/src/normalizers/text.js#L26), [`value.split`](../../../packages/domain/src/normalizers/text.js#L26), [`word.toLowerCase`](../../../packages/domain/src/normalizers/text.js#L29), [`LOWER_WORDS.has`](../../../packages/domain/src/normalizers/text.js#L30), [`capitalizeWord`](../../../packages/domain/src/normalizers/text.js#L31).

#### [`normalizeLooseSearch`](../../../packages/domain/src/normalizers/text.js#L36) · función · exportado

Normaliza `Loose Search` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `text`.
- **Efectos y APIs** `replace`.
- **Llamadas directas en el cuerpo** [`replace`](../../../packages/domain/src/normalizers/text.js#L37), [`normalize`](../../../packages/domain/src/normalizers/text.js#L37), [`trim`](../../../packages/domain/src/normalizers/text.js#L37), [`toLowerCase`](../../../packages/domain/src/normalizers/text.js#L37).
- **Lo usa** [`buildKey`](../../../packages/api-client/src/address/search.js#L13) (llama).

### [`packages/domain/src/normalizers/userProfile.js`](../../../packages/domain/src/normalizers/userProfile.js#L1)

Formatea valores de perfil, como nombre y fecha, en campos del registro.

**Superficie que exporta.** [`USER_NAME_MAX`](../../../packages/domain/src/normalizers/userProfile.js#L1), [`normalizeUserName`](../../../packages/domain/src/normalizers/userProfile.js#L28), [`formatBirthdateInput`](../../../packages/domain/src/normalizers/userProfile.js#L36), [`parseBirthdate`](../../../packages/domain/src/normalizers/userProfile.js#L74), [`buildBirthdateISO`](../../../packages/domain/src/normalizers/userProfile.js#L99), [`getBirthdateStatus`](../../../packages/domain/src/normalizers/userProfile.js#L108), [`formatBirthdateForInput`](../../../packages/domain/src/normalizers/userProfile.js#L127), [`getUserProfileStatus`](../../../packages/domain/src/normalizers/userProfile.js#L138).

**Módulos que lo cargan.** [`index.js`](../../../packages/domain/src/index.js#L7) (reexporta).

#### [`USER_NAME_MAX`](../../../packages/domain/src/normalizers/userProfile.js#L1) · variable de módulo · exportado

Declara `USER_NAME_MAX` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`normalizeUserName`](../../../packages/domain/src/normalizers/userProfile.js#L33) (referencia).

#### [`NAME_CLEAN_RE`](../../../packages/domain/src/normalizers/userProfile.js#L3) · variable de módulo

Declara `NAME_CLEAN_RE` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`normalizeUserName`](../../../packages/domain/src/normalizers/userProfile.js#L30) (referencia).

#### [`MULTI_SPACE_RE`](../../../packages/domain/src/normalizers/userProfile.js#L4) · variable de módulo

Declara `MULTI_SPACE_RE` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`normalizeUserName`](../../../packages/domain/src/normalizers/userProfile.js#L31) (referencia).

#### [`BIRTHDATE_FULL_RE`](../../../packages/domain/src/normalizers/userProfile.js#L5) · variable de módulo

Declara `BIRTHDATE_FULL_RE` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`parseBirthdate`](../../../packages/domain/src/normalizers/userProfile.js#L75) (accede al módulo).

#### [`clamp`](../../../packages/domain/src/normalizers/userProfile.js#L7) · función

Implementa `clamp` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`, `min`, `max`.
- **Condiciones que evalúa** `Number.isNaN`.
- **Lo usa** [`formatBirthdateInput`](../../../packages/domain/src/normalizers/userProfile.js#L47) (llama).

#### [`isLeapYear`](../../../packages/domain/src/normalizers/userProfile.js#L12) · función

Comprueba `Leap Year` para decidir si se admite o continúa la operación.

- **Entradas** `year`.
- **Retorno visible o tipo declarado** `booleano`.
- **Condiciones que evalúa** `ausencia de year`, `0`.
- **Lo usa** [`getDaysInMonth`](../../../packages/domain/src/normalizers/userProfile.js#L22) (llama).

#### [`getDaysInMonth`](../../../packages/domain/src/normalizers/userProfile.js#L19) · función

Obtiene o resuelve `Days In Month` para entregarlo al consumidor.

- **Entradas** `month`, `year`, `preferFeb29 = valor por defecto`.
- **Condiciones que evalúa** `month`, `ausencia de year`, `includes`.
- **Llamadas directas en el cuerpo** [`isLeapYear`](../../../packages/domain/src/normalizers/userProfile.js#L22), [`includes`](../../../packages/domain/src/normalizers/userProfile.js#L24).
- **Lo usa** [`formatBirthdateInput`](../../../packages/domain/src/normalizers/userProfile.js#L54) (llama), [`parseBirthdate`](../../../packages/domain/src/normalizers/userProfile.js#L85) (llama).

#### [`normalizeUserName`](../../../packages/domain/src/normalizers/userProfile.js#L28) · función · exportado

Normaliza `User Name` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value = valor por defecto`.
- **Efectos y APIs** `replace`.
- **Llamadas directas en el cuerpo** [`trimStart`](../../../packages/domain/src/normalizers/userProfile.js#L29), [`replace`](../../../packages/domain/src/normalizers/userProfile.js#L29), [`cleaned.slice`](../../../packages/domain/src/normalizers/userProfile.js#L33).
- **Lo usa** [`getUserProfileStatus`](../../../packages/domain/src/normalizers/userProfile.js#L145) (llama), [`TextInput.onChangeText`](../../../apps/referidos-android/src/features/auth/blocks/OwnerProfileStepBlock.tsx#L42) (llama), [`TextInput.onChangeText`](../../../apps/referidos-android/src/features/auth/blocks/OwnerProfileStepBlock.tsx#L49) (llama).

#### [`formatBirthdateInput`](../../../packages/domain/src/normalizers/userProfile.js#L36) · función · exportado

Formatea `Birthdate Input` para que el consumidor lo pueda presentar.

- **Entradas** `value = valor por defecto`.
- **Efectos y APIs** `replace`.
- **Condiciones que evalúa** `ausencia de digits`, `digits.length`, `yearRaw.length`.
- **Llamadas directas en el cuerpo** [`slice`](../../../packages/domain/src/normalizers/userProfile.js#L37), [`replace`](../../../packages/domain/src/normalizers/userProfile.js#L37), [`today.getFullYear`](../../../packages/domain/src/normalizers/userProfile.js#L39), [`digits.slice`](../../../packages/domain/src/normalizers/userProfile.js#L44), [`clamp`](../../../packages/domain/src/normalizers/userProfile.js#L47), [`parseInt`](../../../packages/domain/src/normalizers/userProfile.js#L47), [`padStart`](../../../packages/domain/src/normalizers/userProfile.js#L51), [`getDaysInMonth`](../../../packages/domain/src/normalizers/userProfile.js#L54).
- **Lo usa** [`OwnerProfileStepBlock`](../../../apps/referidos-android/src/features/auth/blocks/OwnerProfileStepBlock.tsx#L75) (llama), [`TextInput.onChangeText`](../../../apps/referidos-android/src/features/auth/blocks/OwnerProfileStepBlock.tsx#L76) (llama).

#### [`parseBirthdate`](../../../packages/domain/src/normalizers/userProfile.js#L74) · función · exportado

Extrae o interpreta `Birthdate` de los argumentos, estado o datos de entrada.

- **Entradas** `value = valor por defecto`.
- **Retorno visible o tipo declarado** `null`, `day`, `month`, `year`.
- **Condiciones que evalúa** `ausencia de BIRTHDATE_FULL_RE.test`, `ausencia de dd o ausencia de mm o ausencia de yyyy`, `mm`, `dd`, `yyyy`, `yyyy o dd`.
- **Llamadas directas en el cuerpo** [`BIRTHDATE_FULL_RE.test`](../../../packages/domain/src/normalizers/userProfile.js#L75), [`map`](../../../packages/domain/src/normalizers/userProfile.js#L76), [`split`](../../../packages/domain/src/normalizers/userProfile.js#L76), [`parseInt`](../../../packages/domain/src/normalizers/userProfile.js#L78), [`getFullYear`](../../../packages/domain/src/normalizers/userProfile.js#L83), [`getDaysInMonth`](../../../packages/domain/src/normalizers/userProfile.js#L85), [`date.getUTCFullYear`](../../../packages/domain/src/normalizers/userProfile.js#L90), [`date.getUTCMonth`](../../../packages/domain/src/normalizers/userProfile.js#L91), [`date.getUTCDate`](../../../packages/domain/src/normalizers/userProfile.js#L92).
- **Lo usa** [`buildBirthdateISO`](../../../packages/domain/src/normalizers/userProfile.js#L100) (llama), [`getBirthdateStatus`](../../../packages/domain/src/normalizers/userProfile.js#L109) (llama).

#### [`buildBirthdateISO`](../../../packages/domain/src/normalizers/userProfile.js#L99) · función · exportado

Construye `Birthdate ISO` a partir de los datos del flujo.

- **Entradas** `value = valor por defecto`.
- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `ausencia de parsed`.
- **Llamadas directas en el cuerpo** [`parseBirthdate`](../../../packages/domain/src/normalizers/userProfile.js#L100), [`padStart`](../../../packages/domain/src/normalizers/userProfile.js#L102).
- **Lo usa** [`submitOwnerProfile`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L525) (llama).

#### [`getBirthdateStatus`](../../../packages/domain/src/normalizers/userProfile.js#L108) · función · exportado

Obtiene o resuelve `Birthdate Status` para entregarlo al consumidor.

- **Entradas** `value = valor por defecto`, `minAge = valor por defecto`.
- **Retorno visible o tipo declarado** `isValid`, `isUnderage`, `parsed`, `age`.
- **Condiciones que evalúa** `ausencia de parsed`, `today`.
- **Llamadas directas en el cuerpo** [`parseBirthdate`](../../../packages/domain/src/normalizers/userProfile.js#L109), [`today.getFullYear`](../../../packages/domain/src/normalizers/userProfile.js#L113).
- **Lo usa** [`getUserProfileStatus`](../../../packages/domain/src/normalizers/userProfile.js#L151) (llama).

#### [`formatBirthdateForInput`](../../../packages/domain/src/normalizers/userProfile.js#L127) · función · exportado

Formatea `Birthdate For Input` para que el consumidor lo pueda presentar.

- **Entradas** `value`.
- **Condiciones que evalúa** `ausencia de value`, `parts.length`, `ausencia de yyyy o ausencia de mm o ausencia de dd`.
- **Llamadas directas en el cuerpo** [`raw.split`](../../../packages/domain/src/normalizers/userProfile.js#L130), [`base.split`](../../../packages/domain/src/normalizers/userProfile.js#L131), [`dd.padStart`](../../../packages/domain/src/normalizers/userProfile.js#L135), [`mm.padStart`](../../../packages/domain/src/normalizers/userProfile.js#L135).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L201) (llama).

#### [`getUserProfileStatus`](../../../packages/domain/src/normalizers/userProfile.js#L138) · función · exportado

Obtiene o resuelve `User Profile Status` para entregarlo al consumidor.

- **Entradas** `{nombre, apellido, fechaNacimiento, genero, minAge}`.
- **Retorno visible o tipo declarado** `nombre`, `apellido`, `genero`, `birthStatus`, `canSubmit`.
- **Llamadas directas en el cuerpo** [`normalizeUserName`](../../../packages/domain/src/normalizers/userProfile.js#L145), [`trim`](../../../packages/domain/src/normalizers/userProfile.js#L147), [`nameValue.trim`](../../../packages/domain/src/normalizers/userProfile.js#L148), [`lastValue.trim`](../../../packages/domain/src/normalizers/userProfile.js#L149), [`getBirthdateStatus`](../../../packages/domain/src/normalizers/userProfile.js#L151).
- **Lo usa** [`submitOwnerProfile`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L504) (llama).

### [`packages/domain/src/validators/index.js`](../../../packages/domain/src/validators/index.js#L1)

Validadores comunes de datos de auth y perfil para reducir divergencias entre pasos.

**Superficie que exporta.** [`EMAIL_RE`](../../../packages/domain/src/validators/index.js#L1), [`PHONE_EC_RE`](../../../packages/domain/src/validators/index.js#L2), [`CODE_RE`](../../../packages/domain/src/validators/index.js#L3), [`RUC_RE`](../../../packages/domain/src/validators/index.js#L4), [`validateEmail`](../../../packages/domain/src/validators/index.js#L6), [`validateEcuadorPhone`](../../../packages/domain/src/validators/index.js#L10), [`validateRegistrationCode`](../../../packages/domain/src/validators/index.js#L14), [`validarCedula`](../../../packages/domain/src/validators/index.js#L18), [`validateRucFromCedula`](../../../packages/domain/src/validators/index.js#L36).

**Módulos que lo cargan.** [`index.js`](../../../packages/domain/src/index.js#L4) (reexporta).

#### [`EMAIL_RE`](../../../packages/domain/src/validators/index.js#L1) · variable de módulo · exportado

Declara `EMAIL_RE` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`validateEmail`](../../../packages/domain/src/validators/index.js#L7) (accede al módulo).

#### [`PHONE_EC_RE`](../../../packages/domain/src/validators/index.js#L2) · variable de módulo · exportado

Declara `PHONE_EC_RE` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`validateEcuadorPhone`](../../../packages/domain/src/validators/index.js#L11) (accede al módulo).

#### [`CODE_RE`](../../../packages/domain/src/validators/index.js#L3) · variable de módulo · exportado

Declara `CODE_RE` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`validateRegistrationCode`](../../../packages/domain/src/validators/index.js#L15) (accede al módulo).

#### [`RUC_RE`](../../../packages/domain/src/validators/index.js#L4) · variable de módulo · exportado

Declara `RUC_RE` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`validateRucFromCedula`](../../../packages/domain/src/validators/index.js#L38) (accede al módulo).

#### [`validateEmail`](../../../packages/domain/src/validators/index.js#L6) · función · exportado

Comprueba el valor de correo para decidir si se admite o continúa la operación.

- **Entradas** `email`.
- **Llamadas directas en el cuerpo** [`EMAIL_RE.test`](../../../packages/domain/src/validators/index.js#L7), [`trim`](../../../packages/domain/src/validators/index.js#L7).
- **Lo usa** [`submitLogin`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L340) (llama), [`submitRegister`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L366) (llama).

#### [`validateEcuadorPhone`](../../../packages/domain/src/validators/index.js#L10) · función · exportado

Comprueba `Ecuador Phone` para decidir si se admite o continúa la operación.

- **Entradas** `phone`.
- **Llamadas directas en el cuerpo** [`PHONE_EC_RE.test`](../../../packages/domain/src/validators/index.js#L11), [`trim`](../../../packages/domain/src/validators/index.js#L11).

#### [`validateRegistrationCode`](../../../packages/domain/src/validators/index.js#L14) · función · exportado

Comprueba `Registration Code` para decidir si se admite o continúa la operación.

- **Entradas** `code`.
- **Llamadas directas en el cuerpo** [`CODE_RE.test`](../../../packages/domain/src/validators/index.js#L15), [`toUpperCase`](../../../packages/domain/src/validators/index.js#L15), [`trim`](../../../packages/domain/src/validators/index.js#L15).

#### [`validarCedula`](../../../packages/domain/src/validators/index.js#L18) · función · exportado

Implementa `validar Cedula` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `cedula`.
- **Retorno visible o tipo declarado** `booleano`.
- **Condiciones que evalúa** `ausencia de test`, `provincia`, `result`.
- **Llamadas directas en el cuerpo** [`trim`](../../../packages/domain/src/validators/index.js#L19), [`test`](../../../packages/domain/src/validators/index.js#L20), [`value.slice`](../../../packages/domain/src/validators/index.js#L21), [`map`](../../../packages/domain/src/validators/index.js#L24), [`value.split`](../../../packages/domain/src/validators/index.js#L24).
- **Lo usa** [`validateRucFromCedula`](../../../packages/domain/src/validators/index.js#L41) (llama).

#### [`validateRucFromCedula`](../../../packages/domain/src/validators/index.js#L36) · función · exportado

Comprueba `Ruc From Cedula` para decidir si se admite o continúa la operación.

- **Entradas** `ruc`.
- **Retorno visible o tipo declarado** `booleano`.
- **Condiciones que evalúa** `ausencia de RUC_RE.test`.
- **Llamadas directas en el cuerpo** [`trim`](../../../packages/domain/src/validators/index.js#L37), [`RUC_RE.test`](../../../packages/domain/src/validators/index.js#L38), [`value.slice`](../../../packages/domain/src/validators/index.js#L39), [`validarCedula`](../../../packages/domain/src/validators/index.js#L41).
- **Lo usa** [`submitBusinessData`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L588) (llama), [`submitBusinessVerificationData`](../../../apps/referidos-android/src/features/auth/hooks/useAuthEngine.ts#L867) (llama).
