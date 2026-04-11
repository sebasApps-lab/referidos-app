import "../desktopLandingModals.css";
import { useEffect } from "react";

export default function DesktopLandingModalFrame({
  isOpen,
  onClose,
  designWidth,
  designHeight,
  dialogLabel,
  lockHeight = false,
  children,
}) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="figma-prototype__landing-modal-backdrop"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className={[
          "figma-prototype__landing-modal-shell",
          lockHeight ? "figma-prototype__landing-modal-shell--lock-height" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        style={{
          "--landing-modal-design-width": `${designWidth}px`,
          "--landing-modal-design-height": `${designHeight}px`,
        }}
      >
        <div
          className={[
            "figma-prototype__landing-modal-panel",
            lockHeight ? "figma-prototype__landing-modal-panel--lock-height" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          role="dialog"
          aria-modal="true"
          aria-label={dialogLabel}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
