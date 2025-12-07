// src/data/simulatedDataV2.js
// Simulated seed in JS form — mirrors seed.sql, useful for db.seedFromSimulated()
// Uses same IDs and public image URL scheme (storage public bucket).

export function fechaHoyISO() { return new Date().toISOString(); }
export function fechaMasDiasISO(n) { const d = new Date(); d.setDate(d.getDate()+n); return d.toISOString(); }

export const simulatedSeed = {
  usuarios: [
    { id: 'USR_001', nombre: 'Cliente Demo', email: 'user@gmail.com', password: 'user', role: 'cliente', telefono: '0991110001', emailConfirmado: true, referidosCount: 0, fechaCreacion: fechaHoyISO() },
    { id: 'USR_002', nombre: 'Carlos Moya', email: 'carlos.moya@example.com', password: 'Carlos123', role: 'cliente', telefono: '0991110002', emailConfirmado: true, referidosCount: 2, fechaCreacion: fechaHoyISO() },
    { id: 'USR_003', nombre: 'Negocio Demo', email: 'tienda@gmail.com', password: 'tienda', role: 'negocio', telefono: '0990000000', emailConfirmado: true, referidosCount: 0, fechaCreacion: fechaHoyISO() },
    { id: 'USR_004', nombre: 'Admin Demo', email: 'admin@gmail.com', password: 'admin', role: 'admin', emailConfirmado: true, referidosCount: 0, fechaCreacion: fechaHoyISO() },
    { id: 'USR_005', nombre: 'Ana Pérez', email: 'ana.perez@example.com', password: 'Ana12345', role: 'cliente', telefono: '0991110003', emailConfirmado: true, referidosCount: 0, fechaCreacion: fechaHoyISO() },
  ],

  negocios: [
    {
      id: 'NEG_001',
      usuarioId: 'USR_003',
      nombre: 'Pizzería La Rueda',
      categoria: 'Pizzería',
      sector: 'La Mariscal',
      direccion: 'Av. Principal 123',
      lat: -0.180653, lng: -78.467834,
      imagen: 'https://mqgkukbognykqlwxmbli.supabase.co/storage/v1/object/public/business/img_pizzeria_la_rueda.jpg',
      referidosCount: 12,
      fechaCreacion: fechaHoyISO()
    },
    {
      id: 'NEG_002',
      usuarioId: null,
      nombre: 'Café Central',
      categoria: 'Café / Desayunos',
      sector: 'La Floresta',
      direccion: 'Calle 45 #7-89',
      lat: -0.182, lng: -78.47,
      imagen: 'https://mqgkukbognykqlwxmbli.supabase.co/storage/v1/object/public/business/img_cafe_central.jpg',
      referidosCount: 6,
      fechaCreacion: fechaHoyISO()
    },
    {
      id: 'NEG_003',
      usuarioId: null,
      nombre: 'Tienda Verde',
      categoria: 'Tienda / Salud',
      sector: 'Cumbayá',
      direccion: 'Mall Centro',
      lat: -0.179, lng: -78.466,
      imagen: 'https://mqgkukbognykqlwxmbli.supabase.co/storage/v1/object/public/business/img_tienda_verde.jpg',
      referidosCount: 3,
      fechaCreacion: fechaHoyISO()
    },
  ],

  sucursales: [
    { id: 'SUC_001', negocioId: 'NEG_001', direccion: 'Av. Principal 123', sector: 'La Mariscal', lat: -0.180653, lng: -78.467834, imagen: 'https://mqgkukbognykqlwxmbli.supabase.co/storage/v1/object/public/business/SucursalN1/img_SucursalN1.jpg', fechaCreacion: fechaHoyISO() },
    { id: 'SUC_002', negocioId: 'NEG_002', direccion: 'Calle 45 #7-89', sector: 'La Floresta', lat: -0.182, lng: -78.47, imagen: 'https://mqgkukbognykqlwxmbli.supabase.co/storage/v1/object/public/business/SucursalN1/img_SucursalN1.jpg', fechaCreacion: fechaHoyISO() },
    { id: 'SUC_003', negocioId: 'NEG_003', direccion: 'Mall Centro', sector: 'Cumbayá', lat: -0.179, lng: -78.466, imagen: 'https://mqgkukbognykqlwxmbli.supabase.co/storage/v1/object/public/business/SucursalN1/img_SucursalN1.jpg', fechaCreacion: fechaHoyISO() },
  ],

  promos: [
    { id: 'PRO_001', negocioId: 'NEG_001', titulo: '2x1 en pizzas medianas', descripcion: 'Llévate 2 pizzas medianas por el precio de 1.', inicio: fechaHoyISO(), fin: fechaMasDiasISO(365), estado: 'activo', canjeadosCount: 5, imagen: 'https://mqgkukbognykqlwxmbli.supabase.co/storage/v1/object/public/business/img_pizzeria_la_rueda.jpg', fechaCreacion: fechaHoyISO() },
    { id: 'PRO_002', negocioId: 'NEG_001', titulo: 'Combo familiar - 20% off', descripcion: 'Combo para 4 personas.', inicio: fechaHoyISO(), fin: fechaMasDiasISO(180), estado: 'activo', canjeadosCount: 2, imagen: null, fechaCreacion: fechaHoyISO() },
    { id: 'PRO_003', negocioId: 'NEG_001', titulo: 'Promo inactiva', descripcion: 'Vencida', inicio: fechaMasDiasISO(-400), fin: fechaMasDiasISO(-350), estado: 'inactivo', canjeadosCount: 0, imagen: null, fechaCreacion: fechaMasDiasISO(-400) },
    { id: 'PRO_004', negocioId: 'NEG_001', titulo: 'Pendiente revisión', descripcion: 'En cola', inicio: fechaMasDiasISO(1), fin: fechaMasDiasISO(60), estado: 'pendiente', canjeadosCount: 0, imagen: null, fechaCreacion: fechaHoyISO() },

    { id: 'PRO_011', negocioId: 'NEG_002', titulo: '2x1 en capuchino', descripcion: 'Mañanas', inicio: fechaHoyISO(), fin: fechaMasDiasISO(90), estado: 'activo', canjeadosCount: 3, imagen: 'https://mqgkukbognykqlwxmbli.supabase.co/storage/v1/object/public/business/img_cafe_central.jpg', fechaCreacion: fechaHoyISO() },
    { id: 'PRO_012', negocioId: 'NEG_002', titulo: '10% off pastelería', descripcion: 'Descuento', inicio: fechaHoyISO(), fin: fechaMasDiasISO(120), estado: 'activo', canjeadosCount: 1, imagen: null, fechaCreacion: fechaHoyISO() },
    { id: 'PRO_013', negocioId: 'NEG_002', titulo: 'Inactiva café', descripcion: 'Vencida', inicio: fechaMasDiasISO(-200), fin: fechaMasDiasISO(-150), estado: 'inactivo', canjeadosCount: 0, imagen: null, fechaCreacion: fechaMasDiasISO(-200) },
    { id: 'PRO_014', negocioId: 'NEG_002', titulo: 'Pendiente café', descripcion: 'Pendiente', inicio: fechaMasDiasISO(2), fin: fechaMasDiasISO(40), estado: 'pendiente', canjeadosCount: 0, imagen: null, fechaCreacion: fechaHoyISO() },

    { id: 'PRO_021', negocioId: 'NEG_003', titulo: 'Compra 2 lleva 3', descripcion: 'Oferta seleccionada', inicio: fechaHoyISO(), fin: fechaMasDiasISO(200), estado: 'activo', canjeadosCount: 4, imagen: 'https://mqgkukbognykqlwxmbli.supabase.co/storage/v1/object/public/business/img_tienda_verde.jpg', fechaCreacion: fechaHoyISO() },
    { id: 'PRO_022', negocioId: 'NEG_003', titulo: '15% off orgánicos', descripcion: 'Descuento', inicio: fechaHoyISO(), fin: fechaMasDiasISO(150), estado: 'activo', canjeadosCount: 0, imagen: null, fechaCreacion: fechaHoyISO() },
    { id: 'PRO_023', negocioId: 'NEG_003', titulo: 'Inactiva tienda', descripcion: 'Vencida', inicio: fechaMasDiasISO(-300), fin: fechaMasDiasISO(-200), estado: 'inactivo', canjeadosCount: 0, imagen: null, fechaCreacion: fechaMasDiasISO(-300) },
    { id: 'PRO_024', negocioId: 'NEG_003', titulo: 'Pendiente tienda', descripcion: 'Revisión', inicio: fechaMasDiasISO(5), fin: fechaMasDiasISO(50), estado: 'pendiente', canjeadosCount: 0, imagen: null, fechaCreacion: fechaHoyISO() },
  ],

  promos_sucursales: [
    { promoId: 'PRO_001', sucursalId: 'SUC_001' },
    { promoId: 'PRO_002', sucursalId: 'SUC_001' },
    { promoId: 'PRO_011', sucursalId: 'SUC_002' },
    { promoId: 'PRO_021', sucursalId: 'SUC_003' },
  ],

  qrValidos: [
    { id: 'QRV_001', promoId: 'PRO_001', clienteId: 'USR_001', negocioId: 'NEG_001', sucursalId: 'SUC_001', fechaCreacion: fechaHoyISO(), fechaExpira: fechaMasDiasISO(0.0416667), canjeado: false },
    { id: 'QRV_002', promoId: 'PRO_011', clienteId: 'USR_002', negocioId: 'NEG_002', sucursalId: 'SUC_002', fechaCreacion: fechaHoyISO(), fechaExpira: fechaMasDiasISO(0.0833333), canjeado: false },
    { id: 'QRV_003', promoId: 'PRO_021', clienteId: 'USR_001', negocioId: 'NEG_003', sucursalId: 'SUC_003', fechaCreacion: fechaMasDiasISO(-2), fechaExpira: fechaMasDiasISO(1), canjeado: true },
  ],

  escaneos: [
    { id: 'ESC_001', qrValidoId: 'QRV_001', clienteId: 'USR_001', fechaCreacion: fechaMasDiasISO(-0.007) },
    { id: 'ESC_002', qrValidoId: 'QRV_002', clienteId: 'USR_002', fechaCreacion: fechaMasDiasISO(-0.02) },
    { id: 'ESC_003', qrValidoId: 'QRV_003', clienteId: 'USR_001', fechaCreacion: fechaMasDiasISO(-2) },
  ],

  comentarios: [
    { id: 'COM_001', promoId: 'PRO_001', clienteId: 'USR_001', estrellas: 5, texto: 'Excelente pizza', fechaCreacion: fechaMasDiasISO(-10) },
    { id: 'COM_002', promoId: 'PRO_001', clienteId: 'USR_002', estrellas: 4, texto: 'Muy buena', fechaCreacion: fechaMasDiasISO(-8) },
    { id: 'COM_003', promoId: 'PRO_002', clienteId: 'USR_001', estrellas: 4.5, texto: 'Buena promo', fechaCreacion: fechaMasDiasISO(-5) },
    { id: 'COM_004', promoId: 'PRO_011', clienteId: 'USR_002', estrellas: 4, texto: 'Buen café', fechaCreacion: fechaMasDiasISO(-2) },
    { id: 'COM_005', promoId: 'PRO_021', clienteId: 'USR_001', estrellas: 5, texto: 'Gran oferta', fechaCreacion: fechaMasDiasISO(-6) },
  ],

  reportes: [
    { id: 'REP_001', reporterId: 'USR_001', reporterRole: 'cliente', targetId: 'NEG_001', targetType: 'negocio', texto: 'Atención lenta', fechaCreacion: fechaHoyISO() }
  ]
};
