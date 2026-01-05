import React from "react";
import ClienteLayout from "../../cliente/layout/ClienteLayout";
import ClientePerfilView from "../../profile/cliente/ClientePerfil";

export default function ClientePerfil() {
  return (
    <ClienteLayout>
      <ClientePerfilView />
    </ClienteLayout>
  );
}
