import React, { useEffect, useState } from "react";
import "./referencia.css";

const referenciaImage = "/editorial/Waitlist%20-%20Landing%20-%20referencia.png";

export default function ReferenciaPage() {
  const [baseWidth, setBaseWidth] = useState(() =>
    typeof window === "undefined" ? 0 : window.innerWidth,
  );

  useEffect(() => {
    let lastDevicePixelRatio = window.devicePixelRatio || 1;

    const handleResize = () => {
      const nextDevicePixelRatio = window.devicePixelRatio || 1;

      if (Math.abs(nextDevicePixelRatio - lastDevicePixelRatio) < 0.01) {
        setBaseWidth(window.innerWidth);
      }

      lastDevicePixelRatio = nextDevicePixelRatio;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <main className="referencia-page" aria-label="Referencia visual">
      <img
        className="referencia-page__image"
        src={referenciaImage}
        alt="Referencia visual de la landing"
        style={baseWidth ? { width: `${baseWidth}px` } : undefined}
      />
    </main>
  );
}
