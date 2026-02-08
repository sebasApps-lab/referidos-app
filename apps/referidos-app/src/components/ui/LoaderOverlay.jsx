export default function LoaderOverlay({ children }) {
  return (
    <div
      aria-busy="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#FAF8FF",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <div style={{ flex: 1, overflowY: "auto" }}>{children}</div>
    </div>
  );
}
