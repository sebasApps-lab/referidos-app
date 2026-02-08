export const FAQ_SECTIONS = [
  {
    id: "primeros-pasos",
    title: "Primeros pasos",
    items: [
      {
        id: "crear-cuenta",
        question: "¿Cómo creo una cuenta en Referidos?",
        answerByRole: {
          cliente: [
            {
              type: "text",
              text: "Puedes registrarte con correo o con un proveedor social. El flujo te guía paso a paso y solo habilita Continuar cuando los datos son válidos.",
            },
            {
              type: "steps",
              items: [
                "Entra a la pantalla de acceso y selecciona Crear cuenta.",
                "Elige el método de registro (correo o un proveedor social).",
                "Completa nombres, apellidos, fecha de nacimiento y género.",
                "Opcionalmente completa dirección y confirma tu correo.",
                "Finaliza el registro.",
              ],
            },
            {
              type: "note",
              text: "Completar datos y verificar tu correo habilita beneficios adicionales (referidos, más promociones y avance de tier).",
            },
          ],
          negocio: [
            {
              type: "text",
              text: "Puedes registrarte con correo o con un proveedor social. El flujo te guía paso a paso y solo habilita Continuar cuando los datos son válidos.",
            },
            {
              type: "steps",
              items: [
                "Entra a la pantalla de acceso y selecciona Crear cuenta.",
                "Elige el método de registro (correo o un proveedor social).",
                "Completa tus datos personales.",
                "Completa los datos del negocio y confirma dirección + horarios.",
                "Finaliza el registro y, si aplica, verifica tu cuenta.",
              ],
            },
          ],
        },
      },
      {
        id: "no-avanza-registro",
        question: "No puedo avanzar en un paso del registro",
        answerByRole: {
          cliente: [
            {
              type: "text",
              text: "El botón Continuar solo se habilita cuando los campos obligatorios cumplen sus reglas.",
            },
            {
              type: "list",
              items: [
                "Revisa que no falten datos obligatorios.",
                "Verifica el formato de fecha de nacimiento (debes ser mayor de edad).",
                "Asegúrate de seleccionar género.",
                "Si registras teléfono con +593, ingresa 9 dígitos y evita comenzar con 0.",
                "En contraseña, cumple los requisitos que aparecen en pantalla.",
              ],
            },
            {
              type: "note",
              text: "Completar dirección y verificar correo es opcional, pero desbloquea más beneficios.",
            },
          ],
          negocio: [
            {
              type: "text",
              text: "El botón Continuar solo se habilita cuando todos los campos obligatorios cumplen sus reglas.",
            },
            {
              type: "list",
              items: [
                "Revisa que no falten datos obligatorios.",
                "Verifica el formato de fecha de nacimiento (debes ser mayor de edad).",
                "Si registras teléfono con +593, ingresa 9 dígitos y evita comenzar con 0.",
                "Para RUC, deben ser 13 dígitos y el sistema valida la cédula base.",
                "En contraseña, cumple los requisitos que aparecen en pantalla.",
              ],
            },
            {
              type: "note",
              text: "Si ya completaste todo y el botón sigue deshabilitado, revisa que no haya un error marcado en rojo.",
            },
          ],
        },
      },
      {
        id: "correo-no-llega",
        question: "No me llega el correo de verificación",
        answer: [
          {
            type: "steps",
            items: [
              "Revisa la carpeta de spam o promociones.",
              "Confirma que el correo mostrado en pantalla sea correcto.",
              "Pulsa Enviar correo nuevamente desde el bloque de verificación.",
              "Si el correo está mal, edítalo y vuelve a enviar.",
            ],
          },
          {
            type: "note",
            text: "Cuando el correo se confirme, podrás finalizar y tu cuenta quedará verificada.",
          },
        ],
      },
      {
        id: "cuenta-pendiente",
        question: "¿Por qué mi cuenta aparece como pendiente?",
        answerByRole: {
          cliente: [
            {
              type: "text",
              text: "Una cuenta puede quedar pendiente si faltan datos obligatorios del perfil.",
            },
            {
              type: "steps",
              items: [
                "Abre la app y continúa el registro donde lo dejaste.",
                "Completa los campos marcados como obligatorios.",
              ],
            },
            {
              type: "note",
              text: "Completar dirección y verificar correo es opcional, pero habilita más beneficios.",
            },
          ],
          negocio: [
            {
              type: "text",
              text: "Una cuenta queda pendiente cuando faltan datos mínimos del perfil o del negocio.",
            },
            {
              type: "steps",
              items: [
                "Abre la app y continúa el registro donde lo dejaste.",
                "Completa los campos marcados como obligatorios.",
                "Confirma dirección y horarios si eres negocio.",
              ],
            },
            {
              type: "note",
              text: "Al completar los requisitos mínimos, el acceso se activa automáticamente.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "cuenta-seguridad",
    title: "Cuenta y seguridad",
    items: [
      {
        id: "editar-datos",
        question: "¿Cómo actualizo mis datos personales?",
        answer: [
          {
            type: "steps",
            items: [
              "Ve a Perfil.",
              "Ingresa a Datos personales.",
              "Edita la información y guarda los cambios.",
            ],
          },
          {
            type: "note",
            text: "Para cambios sensibles, la app puede solicitar una verificación adicional.",
          },
        ],
      },
      {
        id: "cambiar-correo-telefono",
        question: "¿Cómo cambio mi correo o teléfono?",
        answer: [
          {
            type: "steps",
            items: [
              "Ve a Perfil > Datos personales.",
              "Activa la edición de contacto.",
              "Actualiza el correo o teléfono y guarda.",
            ],
          },
          {
            type: "note",
            text: "Si el cambio es sensible, la app pedirá confirmación adicional.",
          },
        ],
      },
      {
        id: "agregar-contrasena",
        question: "¿Cómo agrego o cambio mi contraseña?",
        answer: [
          {
            type: "text",
            text: "Si te registraste con proveedor social, la app te pedirá crear una contraseña en el Paso 2 de 2.",
          },
          {
            type: "steps",
            items: [
              "Ve a Perfil > Acceso.",
              "Selecciona Añadir o Cambiar contraseña.",
              "Ingresa la nueva contraseña y confírmala.",
              "Guarda los cambios.",
            ],
          },
          {
            type: "note",
            text: "La contraseña debe cumplir los requisitos mostrados en pantalla.",
          },
        ],
      },
      {
        id: "pin-huella",
        question: "¿Cómo activo PIN o huella?",
        answer: [
          {
            type: "steps",
            items: [
              "Ve a Perfil > Acceso.",
              "Elige PIN o Huella.",
              "Completa la verificación del sistema y guarda.",
            ],
          },
          {
            type: "note",
            text: "Estas opciones dependen de la compatibilidad del dispositivo (WebAuthn).",
          },
        ],
      },
      {
        id: "sesion-bloqueada",
        question: "¿Qué pasa si mi sesión se bloquea?",
        answer: [
          {
            type: "text",
            text: "El bloqueo local protege tu información cuando la app queda abierta. Solo desbloquea la UI, no sustituye la autenticación del servidor.",
          },
          {
            type: "steps",
            items: [
              "Si tienes huella o PIN configurados, la app los pedirá al volver.",
              "Si no tienes métodos locales, inicia sesión normalmente.",
            ],
          },
        ],
      },
      {
        id: "sesiones-activas",
        question: "¿Cómo reviso mis sesiones activas?",
        answer: [
          {
            type: "steps",
            items: [
              "Ve a Perfil.",
              "Entra a Sesiones.",
              "Revisa la lista de dispositivos y el último acceso.",
              "Usa la opción de cerrar sesiones si es necesario.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "negocio",
    title: "Registro de negocio",
    audience: ["negocio"],
    items: [
      {
        id: "datos-negocio",
        question: "¿Qué necesito para registrar mi negocio?",
        answer: [
          {
            type: "list",
            items: [
              "Nombre del negocio y categoría.",
              "Dirección confirmada en el mapa o buscador.",
              "Horarios de atención.",
              "RUC y teléfono (para verificación de cuenta).",
            ],
          },
          {
            type: "note",
            text: "El RUC debe tener 13 dígitos y se valida a partir de la cédula.",
          },
        ],
      },
      {
        id: "direccion-horarios",
        question: "¿Cómo confirmo dirección y horarios?",
        answer: [
          {
            type: "steps",
            items: [
              "En el paso de dirección, mueve el mapa o busca la dirección.",
              "Presiona Confirmar cuando el pin esté en el punto correcto.",
              "Revisa los datos de dirección y ajusta horarios.",
              "Marca si es tu sucursal principal y continúa.",
            ],
          },
          {
            type: "note",
            text: "Puedes personalizar horarios por día si lo necesitas.",
          },
        ],
      },
      {
        id: "sucursal-principal",
        question: "¿Qué es la sucursal principal?",
        answer: [
          {
            type: "text",
            text: "Es la ubicación principal de tu negocio en la app. Se usa como referencia para visibilidad y operaciones.",
          },
          {
            type: "note",
            text: "Puedes marcarla durante el registro en la pantalla de dirección.",
          },
        ],
      },
      {
        id: "verificacion-negocio",
        question: "¿Cómo funciona la verificación de negocio?",
        answer: [
          {
            type: "text",
            text: "La verificación confirma que tu cuenta y negocio están listos para operar. Se apoya en correo, teléfono y RUC.",
          },
          {
            type: "steps",
            items: [
              "Completa el RUC y teléfono en el paso de verificación.",
              "Confirma tu correo si aún no está verificado.",
              "Finaliza el proceso para activar la cuenta.",
            ],
          },
        ],
      },
      {
        id: "gestionar-promos",
        question: "¿Cómo gestiono mis promociones?",
        answer: [
          {
            type: "steps",
            items: [
              "Ve a la pestaña Gestionar.",
              "Entra al módulo correspondiente (promos).",
              "Crea o edita tu promoción según la guía en pantalla.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "promos-qr",
    title: "Promociones y QR",
    items: [
      {
        id: "ver-promos",
        question: "¿Dónde veo las promociones?",
        audience: ["cliente"],
        answer: [
          {
            type: "steps",
            items: [
              "Entra a Inicio para ver promociones cercanas.",
              "Usa el buscador o filtros para acotar resultados.",
            ],
          },
        ],
      },
      {
        id: "escanear-qr",
        question: "¿Cómo escaneo un código QR?",
        answerByRole: {
          cliente: [
            {
              type: "steps",
              items: [
                "Ve a la pestaña Escanear.",
                "Permite el acceso a la cámara cuando se solicite.",
                "Enfoca el QR hasta que se lea automáticamente.",
                "Si no hay cámara, usa la entrada manual.",
              ],
            },
          ],
          negocio: [
            {
              type: "steps",
              items: [
                "Ve a la pestaña Escanear.",
                "Permite el acceso a la cámara cuando se solicite.",
                "Enfoca el QR del cliente para validarlo.",
                "Si no hay cámara, usa la entrada manual.",
              ],
            },
          ],
        },
      },
      {
        id: "qr-no-valida",
        question: "El QR no valida, ¿qué hago?",
        answerByRole: {
          cliente: [
            {
              type: "list",
              items: [
                "Revisa que el QR no haya expirado.",
                "Asegúrate de que no haya sido canjeado antes.",
                "Intenta escanear con buena luz y sin reflejos.",
                "Si sigue fallando, usa la entrada manual.",
              ],
            },
          ],
          negocio: [
            {
              type: "list",
              items: [
                "Verifica que el QR esté vigente.",
                "Confirma que no haya sido canjeado previamente.",
                "Escanea con buena luz y sin reflejos.",
                "Si falla, usa la entrada manual.",
              ],
            },
          ],
        },
      },
      {
        id: "historial-qr",
        question: "¿Dónde veo mi historial de QR?",
        audience: ["cliente"],
        answer: [
          {
            type: "steps",
            items: [
              "Ve a la pestaña Historial.",
              "Cambia entre Activos, Canjeados y Expirados.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "beneficios-preferencias",
    title: "Beneficios y preferencias",
    audience: ["cliente"],
    items: [
      {
        id: "tier-beneficios",
        question: "¿Qué es el tier y cómo avanzo?",
        answer: [
          {
            type: "text",
            text: "El tier refleja tu progreso y beneficios. Para avanzar necesitas completar tu perfil y verificar tu correo.",
          },
          {
            type: "steps",
            items: [
              "Ve a Perfil > Beneficios.",
              "Revisa tu progreso y el siguiente objetivo.",
            ],
          },
          {
            type: "note",
            text: "Si faltan datos opcionales (dirección, verificación), no acumularás referidos ni avanzarás de tier.",
          },
        ],
      },
      {
        id: "beneficios-limitados",
        question: "¿Qué pasa si no completo mis datos opcionales?",
        answer: [
          {
            type: "text",
            text: "Podrás usar la app, pero con beneficios limitados.",
          },
          {
            type: "list",
            items: [
              "No se acumulan referidos.",
              "El tier no avanza.",
              "Las promociones disponibles pueden ser más limitadas.",
            ],
          },
          {
            type: "note",
            text: "Completar dirección y verificar correo desbloquea el acceso completo.",
          },
        ],
      },
      {
        id: "notificaciones-preferencias",
        question: "¿Cómo configuro mis notificaciones?",
        answer: [
          {
            type: "steps",
            items: [
              "Ve a Perfil > Notificaciones.",
              "Activa o desactiva los canales disponibles.",
              "Guarda los cambios para aplicar la preferencia.",
            ],
          },
        ],
      },
      {
        id: "apariencia-idioma",
        question: "¿Cómo cambio apariencia o idioma?",
        answer: [
          {
            type: "steps",
            items: [
              "Ve a Perfil > Apariencia o Perfil > Idioma.",
              "Elige el ajuste que prefieras.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "soporte-privacidad",
    title: "Soporte y privacidad",
    items: [
      {
        id: "contactar-soporte",
        question: "¿Cómo contacto soporte?",
        answer: [
          {
            type: "steps",
            items: [
              "Ve a Perfil > Ayuda.",
              "Selecciona Recibir soporte por correo o Chatear con un asesor.",
            ],
          },
        ],
      },
      {
        id: "ubicacion-datos",
        question: "¿Qué datos de ubicación se guardan?",
        answerByRole: {
          cliente: [
            {
              type: "text",
              text: "Solo se guarda la dirección que confirmas en el registro. No se rastrea tu ubicación en tiempo real.",
            },
          ],
          negocio: [
            {
              type: "text",
              text: "Se guarda la dirección de la sucursal que confirmas en el registro. No se rastrea tu ubicación en tiempo real.",
            },
          ],
        },
      },
      {
        id: "eliminar-cuenta",
        question: "¿Cómo elimino mi cuenta?",
        answer: [
          {
            type: "steps",
            items: [
              "Ve a Perfil > Gestionar cuenta.",
              "Abre la zona de seguridad y confirma la eliminación.",
            ],
          },
          {
            type: "note",
            text: "La eliminación es permanente y no se puede deshacer.",
          },
        ],
      },
    ],
  },
];
