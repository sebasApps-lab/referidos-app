import React from "react";
import NegocioLayout from "../../negocio/layout/NegocioLayout";
import EscanerView from "../../scanner/EscanerView";

export default function NegocioEscaner() {
  return (
    <NegocioLayout>
      <EscanerView />
    </NegocioLayout>
  );
}
