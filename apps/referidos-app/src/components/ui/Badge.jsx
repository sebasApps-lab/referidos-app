export default function Badge({ children, className = "", ...props }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
