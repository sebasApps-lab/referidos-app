import { useEffect, useState } from "react";

function getModalScale(designWidth, designHeight) {
  if (typeof window === "undefined") {
    return 1;
  }

  const availableWidth = Math.max(320, window.innerWidth - 64);
  const availableHeight = Math.max(320, window.innerHeight - 64);
  return Math.min(1, availableWidth / designWidth, availableHeight / designHeight);
}

export default function DesktopLandingModalFrame({
  isOpen,
  onClose,
  designWidth,
  designHeight,
  dialogLabel,
  lockHeight = false,
  children,
}) {
  const [scale, setScale] = useState(() => getModalScale(designWidth, designHeight));

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    function handleResize() {
      setScale(getModalScale(designWidth, designHeight));
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [designHeight, designWidth, isOpen]);

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
        className="figma-prototype__landing-modal-shell"
        style={{
          width: `${designWidth * scale}px`,
          ...(lockHeight
            ? { height: `${designHeight * scale}px` }
            : { minHeight: `${designHeight * scale}px` }),
        }}
      >
        <div
          className="figma-prototype__landing-modal-panel"
          role="dialog"
          aria-modal="true"
          aria-label={dialogLabel}
          style={{
            width: `${designWidth}px`,
            ...(lockHeight ? { height: `${designHeight}px` } : { minHeight: `${designHeight}px` }),
            transform: `scale(${scale})`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
