export function splitDireccion(rawDireccion = "") {
  const [calle1, calle2 = ""] = rawDireccion.split("|");
  return { calle1, calle2 };
}

export function mapNegocioPrefill({ usuario, onboarding }) {
  const negocio = onboarding?.negocio ?? null;
  const { calle1, calle2 } = splitDireccion(negocio?.direccion || "");

  return {
    nombreDueno: usuario?.nombre || "",
    apellidoDueno: usuario?.apellido || "",
    telefono: usuario?.telefono || "",
    ruc: usuario?.ruc || "",
    nombreNegocio: negocio?.nombre || "",
    categoriaNegocio: negocio?.categoria || "",
    sectorNegocio: negocio?.sector || "",
    calle1,
    calle2,
  };
}
