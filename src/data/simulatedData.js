// src/data/simulatedData.js
/*
Datos simulados para Referidos App (Zustand / Netlify / Supabase).
- Negocios contienen promos, cada promo tiene 2-4 calificaciones (con idUsuario).
- Negocio tiene calificacionPromedio calculada.
- Usuarios tienen referidosCount (frontend calcula tier).
- Negocios tienen sector aleatorio, imágenes simuladas y 6–10 promos en algunos casos.
*/

// ---------------- Helpers fechas ----------------
function fechaHoy() {
  const d = new Date();
  return d.toISOString().split("T")[0];
}
function fechaMasDias(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().split("T")[0];
}

// ---------------- Utilidades ----------------
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function choose(arr) {
  return arr[randInt(0, arr.length - 1)];
}
function roundHalf(num) {
  return Math.round(num * 2) / 2;
}

const SECTORES = [
  "La Mariscal",
  "La Floresta",
  "Cumbayá",
  "El Inca",
  "El Bosque",
  "Quitumbe",
  "Carcelén",
  "La Carolina",
];

const SHORT_COMMENTS = [
  "Excelente",
  "Muy bueno",
  "Buena atención",
  "Rápido",
  "Recomendado",
  "Normal",
  "Podría mejorar",
  "Muy rico",
  "Volveré",
  "No me gustó",
];

const STAR_VALUES = [5, 4.5, 4, 3.5, 3, 2.5, 2];

// ---------------- Datos base ----------------
export const initialData = {
  soporteNumero: "0995705833",

  usuarios: [
    { id: 1, nombre: "Ana Pérez", email: "ana.perez@example.com", password: "Ana12345", telefono: "0991110001", emailConfirmado: true, role: "cliente", referidosCount: 0 },
    { id: 2, nombre: "Carlos Moya", email: "carlos.moya@example.com", password: "Carlos123", telefono: "0991110002", emailConfirmado: true, role: "cliente", referidosCount: 2 },
    { id: 3, nombre: "María López", email: "maria.lopez@example.com", password: "Maria123", telefono: "0991110003", emailConfirmado: false, role: "cliente", referidosCount: 5 },
    { id: 4, nombre: "Juan Castillo", email: "juan.castillo@example.com", password: "Juan123", telefono: "0991110004", emailConfirmado: true, role: "cliente", referidosCount: 10 },
    { id: 5, nombre: "Lucia Ramos", email: "lucia.ramos@example.com", password: "Lucia123", telefono: "0991110005", emailConfirmado: true, role: "cliente", referidosCount: 1 },
    { id: 6, nombre: "Pedro Suarez", email: "pedro.suarez@example.com", password: "Pedro123", telefono: "0991110006", emailConfirmado: false, role: "cliente", referidosCount: 0 },
    { id: 7, nombre: "Sofia Guerra", email: "sofia.guerra@example.com", password: "Sofia123", telefono: "0991110007", emailConfirmado: true, role: "cliente", referidosCount: 18 },
    { id: 8, nombre: "Diego Palma", email: "diego.palma@example.com", password: "Diego123", telefono: "0991110008", emailConfirmado: true, role: "cliente", referidosCount: 3 },
    { id: 9, nombre: "Elena Viteri", email: "elena.viteri@example.com", password: "Elena123", telefono: "0991110009", emailConfirmado: true, role: "cliente", referidosCount: 25 },
    { id: 10, nombre: "Mateo Flores", email: "mateo.flores@example.com", password: "Mateo123", telefono: "0991110010", emailConfirmado: true, role: "cliente", referidosCount: 40 },
  ],

  negocios: [
    {
      id: 1,
      nombre: "Pizzería La Rueda",
      email: "pizzeria.la.rueda@example.com",
      password: "Pizza123",
      categoria: "Pizzería",
      sector: choose(SECTORES),
      direccion: "Av. Principal 123",
      lat: -0.180653,
      lng: -78.467834,
      role: "negocio",
      imagen: "/assets/business/pizzeria-la-rueda.jpg",
      referidosCount: 12,
      referidos: [2, 3, 8, 9],
      promociones: [
        { id: "p1-1", titulo: "2x1 en pizzas medianas", descripcion: "Llévate 2 pizzas medianas por el precio de 1. Oferta válida solo delivery.", inicio: fechaHoy(), fin: fechaMasDias(30), activo: true, imagen: null },
        { id: "p1-2", titulo: "Combo familiar - 20% off", descripcion: "Combo para 4 personas con bebida incluida.", inicio: fechaHoy(), fin: fechaMasDias(15), activo: true, imagen: null },
        { id: "p1-3", titulo: "Bebida gratis al pedir 2 pizzas", descripcion: "Recibe una bebida de 1L gratis al comprar dos pizzas grandes.", inicio: fechaHoy(), fin: fechaMasDias(10), activo: true, imagen: null },
        { id: "p1-4", titulo: "Pizza nueva: La Andina", descripcion: "Prueba nuestra nueva pizza con ingredientes locales.", inicio: fechaHoy(), fin: fechaMasDias(45), activo: true, imagen: null },
        { id: "p1-5", titulo: "Descuento estudiante - 15%", descripcion: "Presenta tu identificación de estudiante y obtén 15% de descuento.", inicio: fechaHoy(), fin: fechaMasDias(25), activo: true, imagen: null },
        { id: "p1-6", titulo: "Happy Hour - pizzas 30% off", descripcion: "Descuento especial de 5pm a 7pm.", inicio: fechaHoy(), fin: fechaMasDias(7), activo: true, imagen: null },
      ],
    },

    {
      id: 2,
      nombre: "Café Central",
      email: "cafe.central@example.com",
      password: "Cafe123",
      categoria: "Café / Desayunos",
      sector: choose(SECTORES),
      direccion: "Calle 45 #7-89",
      lat: -0.182,
      lng: -78.47,
      role: "negocio",
      imagen: "/assets/business/cafe-central.jpg",
      referidosCount: 6,
      referidos: [1, 5],
      promociones: [
        { id: "p2-1", titulo: "2x1 en capuchino (mañanas)", descripcion: "2 capuchinos por el precio de 1, válido de 7am a 10am.", inicio: fechaHoy(), fin: fechaMasDias(20), activo: true, imagen: null },
        { id: "p2-2", titulo: "10% off en pastelería", descripcion: "Descuento en toda la sección de pastelería.", inicio: fechaHoy(), fin: fechaMasDias(25), activo: true, imagen: null },
        { id: "p2-3", titulo: "Desayuno express", descripcion: "Desayuno + bebida por un precio especial.", inicio: fechaHoy(), fin: fechaMasDias(18), activo: true, imagen: null },
      ],
    },

    {
      id: 3,
      nombre: "Tienda Verde",
      email: "tienda.verde@example.com",
      password: "Verde123",
      categoria: "Tienda / Salud",
      sector: choose(SECTORES),
      direccion: "Mall Centro",
      lat: -0.179,
      lng: -78.466,
      role: "negocio",
      imagen: "/assets/business/tienda-verde.jpg",
      referidosCount: 3,
      referidos: [],
      promociones: [
        { id: "p3-1", titulo: "Compra 2 lleva 3", descripcion: "Oferta en productos seleccionados.", inicio: fechaHoy(), fin: fechaMasDias(40), activo: true, imagen: null },
        { id: "p3-2", titulo: "15% off en productos orgánicos", descripcion: "Oferta válida en tienda física y online.", inicio: fechaHoy(), fin: fechaMasDias(30), activo: true, imagen: null },
        { id: "p3-3", titulo: "Envío gratis", descripcion: "Envío gratis en compras mayores a $25.", inicio: fechaHoy(), fin: fechaMasDias(60), activo: true, imagen: null },
        { id: "p3-4", titulo: "Regalo por primera compra", descripcion: "Pequeño obsequio en tu primera compra.", inicio: fechaHoy(), fin: fechaMasDias(90), activo: true, imagen: null },
      ],
    },

    {
      id: 4,
      nombre: "GymFit",
      email: "gymfit@example.com",
      password: "Gym123",
      categoria: "Gimnasio / Deportes",
      sector: choose(SECTORES),
      direccion: "Av. Fitness 50",
      lat: -0.185,
      lng: -78.468,
      role: "negocio",
      imagen: "/assets/business/gymfit.jpg",
      referidosCount: 20,
      referidos: [4, 7, 10],
      promociones: [
        { id: "p4-1", titulo: "1 semana gratis al referir a un amigo", descripcion: "Entrenamientos ilimitados durante 7 días.", inicio: fechaHoy(), fin: fechaMasDias(45), activo: true, imagen: null },
        { id: "p4-2", titulo: "30% off matrícula", descripcion: "Promoción por tiempo limitado para nuevos socios.", inicio: fechaHoy(), fin: fechaMasDias(12), activo: true, imagen: null },
        { id: "p4-3", titulo: "Clase gratuita de yoga", descripcion: "Clase grupal todos los sábados.", inicio: fechaHoy(), fin: fechaMasDias(20), activo: true, imagen: null },
        { id: "p4-4", titulo: "Entrenamiento personalizado - 2x1", descripcion: "Sesiones con entrenador personal.", inicio: fechaHoy(), fin: fechaMasDias(35), activo: true, imagen: null },
        { id: "p4-5", titulo: "Pack mensual descuento", descripcion: "Ahorra en tu mensualidad con este pack.", inicio: fechaHoy(), fin: fechaMasDias(60), activo: true, imagen: null },
        { id: "p4-6", titulo: "Promoción verano - tarifa reducida", descripcion: "Oferta especial por temporada.", inicio: fechaHoy(), fin: fechaMasDias(90), activo: true, imagen: null },
        { id: "p4-7", titulo: "Clase spinning gratis", descripcion: "Clase limitada para 10 personas.", inicio: fechaHoy(), fin: fechaMasDias(5), activo: true, imagen: null },
      ],
    },

    {
      id: 5,
      nombre: "Panadería Dulce Amanecer",
      email: "dulce.amanecer@example.com",
      password: "Pan123",
      categoria: "Panadería / Repostería",
      sector: choose(SECTORES),
      direccion: "Pasaje 8 de Diciembre 200",
      lat: -0.1835,
      lng: -78.4665,
      role: "negocio",
      imagen: "/assets/business/dulce-amanecer.jpg",
      referidosCount: 2,
      referidos: [5],
      promociones: [
        { id: "p5-1", titulo: "Media docena - 10% off", descripcion: "Descuento en medias docenas de panes seleccionados.", inicio: fechaHoy(), fin: fechaMasDias(25), activo: true, imagen: null },
        { id: "p5-2", titulo: "Pan del día - 2x1", descripcion: "Oferta especial para el pan del día.", inicio: fechaHoy(), fin: fechaMasDias(7), activo: true, imagen: null },
      ],
    },
  ],

  qrValidos: [],

  admin: {
    id: 999,
    nombre: "Admin",
    email: "alejoguamialama@gmail.com",
    password: "admin879bc1336694",
    role: "admin",
    emailConfirmado: true,
  },
};

// ---------------- Calificaciones simuladas ----------------
(function populateCalificationsAndAverages() {
  const usuariosIds = initialData.usuarios.map((u) => u.id);

  initialData.negocios.forEach((neg) => {
    neg.promociones.forEach((promo) => {
      const n = randInt(2, 4);
      promo.calificaciones = [];
      for (let i = 0; i < n; i++) {
        const idUsuario = choose(usuariosIds);
        const estrellas = choose(STAR_VALUES);
        const comentario = choose(SHORT_COMMENTS);
        const fecha = fechaMasDias(-randInt(0, 60));
        promo.calificaciones.push({
          idUsuario,
          estrellas,
          comentario,
          fecha,
        });
      }

      if (!promo.imagen) promo.imagen = null;
    });

    const todas = neg.promociones.flatMap((p) => p.calificaciones || []);
    if (!todas.length) neg.calificacionPromedio = 0;
    else {
      const suma = todas.reduce((s, c) => s + c.estrellas, 0);
      neg.calificacionPromedio = roundHalf(suma / todas.length);
    }
  });
})();

// ---------------- Extractores ----------------
function flattenPromos() {
  const out = [];
  initialData.negocios.forEach((neg) => {
    neg.promociones.forEach((p) => {
      out.push({
        ...p,
        negocioId: neg.id,
        localName: neg.nombre,
        categoria: neg.categoria,
        sector: neg.sector,
        lat: neg.lat,
        lng: neg.lng,
        imagen: p.imagen || neg.imagen || null,
        calificacionNegocio: neg.calificacionPromedio,
      });
    });
  });
  return out;
}

export function getRecomendadas() {
  return initialData.negocios.flatMap((n) =>
    n.promociones.slice(0, 1).map((p) => ({
      ...p,
      negocioId: n.id,
      localName: n.nombre,
      categoria: n.categoria,
      sector: n.sector,
      lat: n.lat,
      lng: n.lng,
      imagen: p.imagen || n.imagen || null,
      calificacionNegocio: n.calificacionPromedio,
    }))
  );
}

export function getPromosCercanas(lat, lng) {
  if (!lat || !lng) return [];
  const R = 0.015;
  const all = flattenPromos();
  const nearby = all.filter((p) => Math.abs(p.lat - lat) <= R && Math.abs(p.lng - lng) <= R);
  return nearby.length ? nearby : all.slice(0, 8);
}

export function getPromosNuevas() {
  return flattenPromos()
    .sort((a, b) => new Date(b.inicio) - new Date(a.inicio))
    .slice(0, 12);
}

export function getPromosHot() {
  return flattenPromos()
    .filter((p) => p.activo)
    .sort((a, b) => new Date(a.fin) - new Date(b.fin))
    .slice(0, 12);
}

export function getAllPromos() {
  return flattenPromos();
}

export default {
  initialData,
  getRecomendadas,
  getPromosCercanas,
  getPromosNuevas,
  getPromosHot,
  getAllPromos,
};
