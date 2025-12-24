import React from "react";
import ClienteLayout from "../../cliente/layout/ClienteLayout";
import ClienteInicioView from "../../cliente/inicio/ClienteInicio";

export default function ClienteInicio() {
  return (
    <ClienteLayout>
      <ClienteInicioView />
    </ClienteLayout>
  );
}
