export default function MobileFooterPanels({ panels, onPanelClick, className = "" }) {
  return (
    <div className={`mobile-landing__footer-panels ${className}`.trim()}>
      {panels.map((panel) => (
        <button
          key={panel.key}
          type="button"
          className="mobile-landing__footer-panel"
          onClick={() => onPanelClick?.(panel.key)}
        >
          <span>{panel.label}</span>
        </button>
      ))}
    </div>
  );
}
