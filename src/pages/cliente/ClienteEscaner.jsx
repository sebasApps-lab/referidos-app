import React from "react";
import ClienteLayout from "../../cliente/layout/ClienteLayout";
import EscanerView from "../../scanner/EscanerView";

export default function ClienteEscaner() {
  return (
    <ClienteLayout>
      <EscanerView />
    </ClienteLayout>
  );
}
