import React from "react";

export default function StepProgress({ page }) {
  const segment = (n) => (
    <div
      key={n}
      className="flex-1 mx-1 rounded-full"
      style={{
        height: 4,
        background: "#FFFFFF",
        opacity: page === n ? 1 : 0.35,
        transition: "opacity 200ms",
      }}
    />
  );

  return (
    <div className="flex">
      {segment(1)}
      {segment(2)}
      {segment(3)}
    </div>
  );
}
