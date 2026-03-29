type Audience = "cliente" | "negocio";

type FaqItem = {
  id: string;
  question: string;
  answer: string[];
  audience?: Audience[];
};

type FaqSection = {
  id: string;
  title: string;
  audience?: Audience[];
  items: FaqItem[];
};

const FAQ_SECTIONS: FaqSection[] = [
  {
    id: "primeros-pasos",
    title: "Primeros pasos",
    items: [
      {
        id: "crear-cuenta",
        question: "Como creo una cuenta en Referidos?",
        answer: [
          "Puedes registrarte con correo o con un proveedor social.",
          "El flujo te guia paso a paso y solo habilita continuar cuando los datos son validos.",
          "Si completas datos y verificas tu correo desbloqueas mas beneficios.",
        ],
      },
      {
        id: "no-avanza-registro",
        question: "No puedo avanzar en un paso del registro",
        answer: [
          "Revisa que no falten campos obligatorios.",
          "Valida formato de fecha, telefono y contrasena segun las reglas que aparecen en pantalla.",
          "Si eres negocio, confirma tambien RUC, direccion y horarios.",
        ],
      },
      {
        id: "correo-no-llega",
        question: "No me llega el correo de verificacion",
        answer: [
          "Revisa spam o promociones.",
          "Confirma que el correo mostrado en pantalla sea correcto.",
          "Vuelve a enviarlo desde el bloque de verificacion.",
        ],
      },
      {
        id: "cuenta-pendiente",
        question: "Por que mi cuenta aparece como pendiente?",
        answer: [
          "La cuenta queda pendiente cuando faltan datos minimos del perfil.",
          "En negocio tambien puede faltar direccion, horarios o verificacion base.",
          "Completa el flujo y el acceso se activa automaticamente.",
        ],
      },
    ],
  },
  {
    id: "cuenta-seguridad",
    title: "Cuenta y seguridad",
    items: [
      {
        id: "editar-datos",
        question: "Como actualizo mis datos personales?",
        answer: [
          "Ve a Perfil y revisa los bloques de cuenta y seguridad.",
          "Para cambios sensibles la app puede pedir verificacion adicional.",
        ],
      },
      {
        id: "cambiar-correo-telefono",
        question: "Como cambio mi correo o telefono?",
        answer: [
          "Actualiza el dato dentro de Perfil.",
          "Si el cambio es sensible, la app solicitara confirmacion adicional.",
        ],
      },
      {
        id: "agregar-contrasena",
        question: "Como agrego o cambio mi contrasena?",
        answer: [
          "Si entraste con proveedor social, puedes agregar contrasena desde Acceso.",
          "La contrasena debe cumplir las reglas mostradas en pantalla.",
        ],
      },
      {
        id: "pin-huella",
        question: "Como activo PIN o huella?",
        answer: [
          "Ve a Perfil > Seguridad.",
          "Activa PIN o biometria si el dispositivo es compatible.",
        ],
      },
      {
        id: "sesiones-activas",
        question: "Como reviso mis sesiones activas?",
        answer: [
          "Abre la seccion de sesiones y revisa la lista de dispositivos.",
          "Puedes cerrar sesiones especificas o cerrar todas.",
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
        question: "Que necesito para registrar mi negocio?",
        answer: [
          "Nombre del negocio, categoria y direccion confirmada.",
          "Horarios de atencion, RUC y telefono para verificacion.",
        ],
      },
      {
        id: "direccion-horarios",
        question: "Como confirmo direccion y horarios?",
        answer: [
          "Confirma la ubicacion en mapa o buscador.",
          "Revisa la direccion final y ajusta horarios por dia si es necesario.",
        ],
      },
      {
        id: "verificacion-negocio",
        question: "Como funciona la verificacion de negocio?",
        answer: [
          "Se apoya en correo, telefono y RUC.",
          "Cuando completas esos datos, la cuenta queda lista para operar.",
        ],
      },
      {
        id: "gestionar-promos",
        question: "Como gestiono mis promociones?",
        answer: [
          "Ve a Gestionar y usa el modulo de promos.",
          "Desde admin tambien existe supervision y moderacion de tus promos.",
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
        question: "Donde veo las promociones?",
        audience: ["cliente"],
        answer: [
          "En Inicio puedes ver promociones cercanas y usar filtros.",
          "El detalle disponible depende de tu perfil y beneficios habilitados.",
        ],
      },
      {
        id: "escanear-qr",
        question: "Como escaneo un codigo QR?",
        answer: [
          "Ve a la pestana Escanear y permite acceso a camara cuando se solicite.",
          "Si la camara falla, usa la entrada manual.",
        ],
      },
      {
        id: "qr-no-valida",
        question: "El QR no valida, que hago?",
        answer: [
          "Verifica vigencia y que no haya sido canjeado antes.",
          "Escanea con buena luz y sin reflejos o usa la entrada manual.",
        ],
      },
      {
        id: "historial-qr",
        question: "Donde veo mi historial de QR?",
        audience: ["cliente"],
        answer: [
          "Ve a Historial para revisar activos, canjeados y expirados.",
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
        question: "Que es el tier y como avanzo?",
        answer: [
          "El tier refleja tu progreso y beneficios.",
          "Completar perfil y verificar correo habilita avance y mejores promos.",
        ],
      },
      {
        id: "beneficios-limitados",
        question: "Que pasa si no completo mis datos opcionales?",
        answer: [
          "Puedes usar la app, pero con beneficios limitados.",
          "No acumulas referidos ni avanzas de tier hasta completar lo requerido.",
        ],
      },
      {
        id: "notificaciones-preferencias",
        question: "Como configuro mis notificaciones?",
        answer: [
          "Ve a Perfil > Preferencias > Notificaciones.",
          "Activa o desactiva los canales disponibles y guarda tu preferencia.",
        ],
      },
      {
        id: "apariencia-idioma",
        question: "Como cambio apariencia o idioma?",
        answer: [
          "Ve a Perfil > Preferencias.",
          "Ajusta tema e idioma segun tu preferencia.",
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
        question: "Como contacto soporte?",
        answer: [
          "Ve a Perfil > Ayuda.",
          "Puedes usar FAQ, soporte por correo o chatear con un asesor.",
        ],
      },
      {
        id: "ubicacion-datos",
        question: "Que datos de ubicacion se guardan?",
        answer: [
          "Solo se guarda la direccion que confirmas en registro.",
          "No se rastrea tu ubicacion en tiempo real.",
        ],
      },
      {
        id: "eliminar-cuenta",
        question: "Como elimino mi cuenta?",
        answer: [
          "Ve a Perfil > Cuenta y usa la zona de seguridad.",
          "La eliminacion es permanente y no se puede deshacer.",
        ],
      },
    ],
  },
];

export function getFaqSectionsForAudience(audience: Audience) {
  return FAQ_SECTIONS
    .filter((section) => !section.audience || section.audience.includes(audience))
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => !item.audience || item.audience.includes(audience)),
    }))
    .filter((section) => section.items.length > 0);
}
