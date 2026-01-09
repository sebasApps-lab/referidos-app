import React from "react";

export default function BusinessAddressStep({ innerRef }) {
  return (
    <section
      style={{ boxSizing: "border-box", position: "relative", zIndex: 1 }}
      className="px-2 h-full"
    >
      <div className="pb-4 flex h-full flex-col" ref={innerRef} />
    </section>
  );
}
