import React from "react";
import NegocioLayout from "../../negocio/layout/NegocioLayout";
import NegocioPerfilView from "../../profile/negocio/NegocioPerfil";

export default function NegocioPerfil() {
  return (
    <NegocioLayout>
      <NegocioPerfilView />
    </NegocioLayout>
  );
}
