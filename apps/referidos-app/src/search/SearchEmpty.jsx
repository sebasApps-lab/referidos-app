export default function SearchEmpty({ message = "No hay resultados." }) {
  return (
    <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-4 py-6 text-center text-sm text-gray-500">
      {message}
    </div>
  );
}
