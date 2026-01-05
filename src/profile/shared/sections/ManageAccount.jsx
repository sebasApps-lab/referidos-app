import React from "react";

export default function ManageAccount({ blocks = [], footer }) {
  const contentBlocks = React.Children.toArray(blocks);

  return (
    <section className="space-y-5">
      {contentBlocks}
      {footer}
    </section>
  );
}
