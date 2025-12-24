import React from "react";
import ClienteHeader from "../../../cliente/layout/ClienteHeader";

export default function HeaderCliente({ collapsedRef, expandedRef, ...rest }) {
  return (
    <div ref={collapsedRef}>
      <ClienteHeader {...rest} />
      <div ref={expandedRef} style={{ height: 0 }} />
    </div>
  );
}
