export default function SearchOverlay({ open = false, onClick }) {
  if (!open) return null;
  return (
    <div
      role="presentation"
      onClick={onClick}
      className="fixed inset-0 z-[5] bg-black/35 backdrop-blur-[1px]"
    />
  );
}
