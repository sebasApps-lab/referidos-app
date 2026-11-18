# PWA principal · Auth y onboarding · 5 de 5

[Índice del área](README.md) · [Índice de código](../README.md)

## Archivos de este capítulo

- [`apps/referidos-app/src/auth/utils/userProfileUtils.js`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L1)

## Símbolos y conexiones

### [`apps/referidos-app/src/auth/utils/userProfileUtils.js`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L1)

Agrupa transformaciones y validación de identificación y datos personales.

**Superficie que exporta.** [`USER_NAME_MAX`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L1), [`normalizeUserName`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L28), [`formatBirthdateInput`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L36), [`parseBirthdate`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L85), [`getBirthdateStatus`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L108), [`formatBirthdateForInput`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L133), [`buildBirthdateISO`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L144), [`getUserProfileStatus`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L153).

**Módulos que lo cargan.** [`AuthFlow.jsx`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L28) (importa), [`useAuthActions.js`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L12) (importa), [`useAuthPrefill.js`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L4) (importa), [`UserProfileStep.jsx`](../../../apps/referidos-app/src/auth/steps/UserProfileStep.jsx#L3) (importa).

#### [`USER_NAME_MAX`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L1) · variable de módulo · exportado

Declara `USER_NAME_MAX` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`normalizeUserName`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L33) (referencia).

#### [`NAME_CLEAN_RE`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L3) · variable de módulo

Declara `NAME_CLEAN_RE` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`normalizeUserName`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L30) (referencia).

#### [`MULTI_SPACE_RE`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L4) · variable de módulo

Declara `MULTI_SPACE_RE` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`normalizeUserName`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L31) (referencia).

#### [`BIRTHDATE_FULL_RE`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L5) · variable de módulo

Declara `BIRTHDATE_FULL_RE` como valor compartido de este archivo. Sus referencias indican dónde se aplica.

- **Lo usa** [`parseBirthdate`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L86) (accede al módulo).

#### [`clamp`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L7) · función

Implementa `clamp` dentro de este módulo. Los argumentos, llamadas y usos de abajo delimitan su alcance.

- **Entradas** `value`, `min`, `max`.
- **Condiciones que evalúa** `Number.isNaN`.
- **Lo usa** [`formatBirthdateInput`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L52) (llama).

#### [`isLeapYear`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L12) · función

Comprueba `Leap Year` para decidir si se admite o continúa la operación.

- **Entradas** `year`.
- **Retorno visible o tipo declarado** `booleano`.
- **Condiciones que evalúa** `ausencia de year`, `0`.
- **Lo usa** [`getDaysInMonth`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L22) (llama).

#### [`getDaysInMonth`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L19) · función

Obtiene o resuelve `Days In Month` para entregarlo al consumidor.

- **Entradas** `month`, `year`, `preferFeb29 = valor por defecto`.
- **Condiciones que evalúa** `month`, `ausencia de year`, `includes`.
- **Llamadas directas en el cuerpo** [`isLeapYear`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L22), [`includes`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L24).
- **Lo usa** [`formatBirthdateInput`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L64) (llama), [`parseBirthdate`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L93) (llama).

#### [`normalizeUserName`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L28) · función · exportado

Normaliza `User Name` antes de validarlo, mostrarlo o enviarlo.

- **Entradas** `value = valor por defecto`.
- **Efectos y APIs** `replace`, `value.replace`.
- **Llamadas directas en el cuerpo** [`trimStart`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L29), [`replace`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L29), [`value.replace`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L29), [`cleaned.slice`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L33).
- **Lo usa** [`getUserProfileStatus`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L160) (llama), [`handleUserProfile`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L523) (llama), [`useEffect · callback`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L221) (llama), [`input.onChange`](../../../apps/referidos-app/src/auth/steps/UserProfileStep.jsx#L65) (llama), [`input.onChange`](../../../apps/referidos-app/src/auth/steps/UserProfileStep.jsx#L77) (llama).

#### [`formatBirthdateInput`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L36) · función · exportado

Formatea `Birthdate Input` para que el consumidor lo pueda presentar.

- **Entradas** `value = valor por defecto`.
- **Efectos y APIs** `value.replace`.
- **Condiciones que evalúa** `ausencia de digits`, `digits.length`, `yearRaw.length`.
- **Llamadas directas en el cuerpo** [`slice`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L37), [`value.replace`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L37), [`today.getFullYear`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L39), [`digits.slice`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L43), [`clamp`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L52), [`parseInt`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L52), [`padStart`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L53), [`getDaysInMonth`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L64).
- **Lo usa** [`input.onChange`](../../../apps/referidos-app/src/auth/steps/UserProfileStep.jsx#L91) (llama).

#### [`parseBirthdate`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L85) · función · exportado

Extrae o interpreta `Birthdate` de los argumentos, estado o datos de entrada.

- **Entradas** `value = valor por defecto`.
- **Retorno visible o tipo declarado** `null`, `day`, `month`, `year`.
- **Condiciones que evalúa** `ausencia de BIRTHDATE_FULL_RE.test`, `ausencia de dd o ausencia de mm o ausencia de yyyy`, `mm`, `dd`, `yyyy`, `yyyy o dd`.
- **Llamadas directas en el cuerpo** [`BIRTHDATE_FULL_RE.test`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L86), [`map`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L87), [`value.split`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L87), [`parseInt`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L87), [`getFullYear`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L91), [`getDaysInMonth`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L93), [`date.getUTCFullYear`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L98), [`date.getUTCMonth`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L99), [`date.getUTCDate`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L100).
- **Lo usa** [`getBirthdateStatus`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L109) (llama), [`buildBirthdateISO`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L145) (llama).

#### [`getBirthdateStatus`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L108) · función · exportado

Obtiene o resuelve `Birthdate Status` para entregarlo al consumidor.

- **Entradas** `value = valor por defecto`, `minAge = valor por defecto`.
- **Retorno visible o tipo declarado** `isValid`, `isUnderage`, `parsed`, `age`.
- **Condiciones que evalúa** `ausencia de parsed`, `today`.
- **Llamadas directas en el cuerpo** [`parseBirthdate`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L109), [`today.getFullYear`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L116).
- **Lo usa** [`getUserProfileStatus`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L166) (llama), [`birthStatus`](../../../apps/referidos-app/src/auth/steps/UserProfileStep.jsx#L30) (llama).

#### [`formatBirthdateForInput`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L133) · función · exportado

Formatea `Birthdate For Input` para que el consumidor lo pueda presentar.

- **Entradas** `value`.
- **Condiciones que evalúa** `ausencia de value`, `parts.length`, `ausencia de yyyy o ausencia de mm o ausencia de dd`.
- **Llamadas directas en el cuerpo** [`raw.split`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L136), [`base.split`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L137), [`dd.padStart`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L141), [`mm.padStart`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L141).
- **Lo usa** [`useEffect · callback`](../../../apps/referidos-app/src/auth/hooks/useAuthPrefill.js#L223) (llama).

#### [`buildBirthdateISO`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L144) · función · exportado

Construye `Birthdate ISO` a partir de los datos del flujo.

- **Entradas** `value = valor por defecto`.
- **Retorno visible o tipo declarado** `null`.
- **Condiciones que evalúa** `ausencia de parsed`.
- **Llamadas directas en el cuerpo** [`parseBirthdate`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L145), [`padStart`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L147).
- **Lo usa** [`handleUserProfile`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L576) (llama).

#### [`getUserProfileStatus`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L153) · función · exportado

Obtiene o resuelve `User Profile Status` para entregarlo al consumidor.

- **Entradas** `{nombre, apellido, fechaNacimiento, genero, minAge}`.
- **Retorno visible o tipo declarado** `nombre`, `apellido`, `genero`, `birthStatus`, `canSubmit`.
- **Llamadas directas en el cuerpo** [`normalizeUserName`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L160), [`trim`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L162), [`nameValue.trim`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L163), [`lastValue.trim`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L164), [`getBirthdateStatus`](../../../apps/referidos-app/src/auth/utils/userProfileUtils.js#L166).
- **Lo usa** [`ownerStatus`](../../../apps/referidos-app/src/auth/AuthFlow.jsx#L398) (llama), [`handleUserProfile`](../../../apps/referidos-app/src/auth/hooks/useAuthActions.js#L508) (llama).
