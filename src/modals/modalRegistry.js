// src/modals/modalRegistry.js

import ModalTier from "../components/modals/ModalTier";
import ModalBeneficios from "../components/modals/ModalBeneficios";
import ModalCodigoNegocio from "../components/modals/ModalCodigoNegocio";
import ModalCuentaExistente from "../components/modals/ModalCuentaExistente";

export const modalRegistry = {
  Tier: ModalTier,
  Beneficios: ModalBeneficios,
  CodigoNegocio: ModalCodigoNegocio,
  CuentaExistente: ModalCuentaExistente,
};
