export default function MobileFooterPanels({ panels, onPanelClick }) {
  return (
    <div className="mobile-landing__footer-panels">
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
