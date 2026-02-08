import React from "react";
import NegocioLayout from "../../negocio/layout/NegocioLayout";
import NegocioEscanerBase from "../../negocio/base/NegocioEscanerBase";

export default function NegocioEscaner() {
  return (
    <NegocioLayout>
      <NegocioEscanerBase />
    </NegocioLayout>
  );
}
