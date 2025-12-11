// src/modals/modalRegistry.js

import ModalTier from "../components/modals/ModalTier";
import ModalBeneficios from "../components/modals/ModalBeneficios";
import ModalCodigoNegocio from "../components/modals/ModalCodigoNegocio";
import ModalCuentaExistente from "../components/modals/ModalCuentaExistente";
import ModalAbandonarRegistro from "../components/modals/ModalAbandonarRegistro";
import ModalEliminarCuenta from "../components/modals/ModalEliminarCuenta";

export const modalRegistry = {
  Tier: ModalTier,
  Beneficios: ModalBeneficios,
  CodigoNegocio: ModalCodigoNegocio,
  CuentaExistente: ModalCuentaExistente,
  AbandonarRegistro: ModalAbandonarRegistro,
  EliminarCuenta: ModalEliminarCuenta,
};
