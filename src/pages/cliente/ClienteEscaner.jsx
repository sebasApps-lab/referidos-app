import React from "react";
import ClienteLayout from "../../cliente/layout/ClienteLayout";
import ClienteEscanerBase from "../../cliente/base/ClienteEscanerBase";

export default function ClienteEscaner() {
  return (
    <ClienteLayout>
      <ClienteEscanerBase />
    </ClienteLayout>
  );
}
