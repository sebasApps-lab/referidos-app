import React from "react";
import NegocioLayout from "../../negocio/layout/NegocioLayout";
import NegocioInicioView from "../../negocio/inicio/NegocioInicio";

export default function NegocioInicio() {
  return (
    <NegocioLayout>
      <NegocioInicioView />
    </NegocioLayout>
  );
}
