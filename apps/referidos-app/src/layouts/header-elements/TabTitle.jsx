export default function TabTitle({ title, action }) {
  return (
    <div className="relative flex h-10 items-center justify-center">
      <h1 className="text-sm font-semibold text-white">{title}</h1>
      {action ? (
        <div className="absolute right-0 flex items-center">{action}</div>
      ) : null}
    </div>
  );
}
