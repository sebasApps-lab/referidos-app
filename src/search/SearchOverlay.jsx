export default function SearchOverlay({ open = false, onClick }) {
  if (!open) return null;
  return (
    <div
      role="presentation"
      onClick={onClick}
      className="fixed inset-0 z-[90] bg-white/95"
    />
  );
}
