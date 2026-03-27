import { useEffect } from "react";

export default function MobileLandingModalFrame({
  isOpen,
  onClose,
  designWidth,
  designHeight,
  dialogLabel,
  lockHeight = false,
  rootClassName = "",
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
      className={`mobile-landing__modal-root ${rootClassName} figma-prototype__landing-modal-backdrop`.trim()}
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="figma-prototype__landing-modal-shell">
        <div
          className="figma-prototype__landing-modal-panel"
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
