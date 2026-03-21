export default function MobileFooterPanels({ panels }) {
  return (
    <div className="mobile-landing__footer-panels">
      {panels.map((panel) => (
        <button key={panel} type="button" className="mobile-landing__footer-panel">
          <span>{panel}</span>
        </button>
      ))}
    </div>
  );
}
