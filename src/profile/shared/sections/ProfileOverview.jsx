import React from "react";

export default function ProfileOverview({
  headerBadge,
  verificationBlock,
  identityBlock,
  primaryBlock,
  secondaryBlock,
  extraBlocks = [],
}) {
  const blocks = [primaryBlock, secondaryBlock, ...extraBlocks].filter(Boolean);
  return (
    <section className="px-2">
      {headerBadge ? (
        <div className="-mt-10 mb-10 flex justify-center">
          {typeof headerBadge === "string" ? (
            <span className="inline-flex items-center rounded-full bg-black/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
              {headerBadge}
            </span>
          ) : (
            headerBadge
          )}
        </div>
      ) : null}
      {verificationBlock}
      {identityBlock}
      {blocks.length ? <div className="mt-6 grid gap-5">{blocks}</div> : null}
    </section>
  );
}
