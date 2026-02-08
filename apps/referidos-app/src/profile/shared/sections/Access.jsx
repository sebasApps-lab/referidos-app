import React from "react";

export default function Access({
  title = "Metodos de acceso",
  subtitle = "Gestiona metodos de acceso y cuentas vinculadas.",
  warningBlock,
  blocks = [],
  infoBlock,
  footer,
}) {
  const contentBlocks = React.Children.toArray(blocks);

  return (
    <section className="relative rounded-[30px] border border-[#E9E2F7] px-6 pb-6 pt-6 space-y-6">
      <div className="absolute -top-3 left-4 right-4 flex items-center gap-3">
        <span className="bg-white px-2 text-xs uppercase tracking-[0.2em] text-[#5E30A5]/70">
          {title}
        </span>
      </div>
      {subtitle ? (
        <div className="mt-1">
          <p className="text-xs text-slate-500 text-center">{subtitle}</p>
        </div>
      ) : null}

      {warningBlock}

      {contentBlocks.length ? (
        <div className="grid gap-4 md:grid-cols-2">{contentBlocks}</div>
      ) : null}

      {infoBlock}
      {footer}
    </section>
  );
}
