export default function SearchEmpty({ message = "No hay resultados." }) {
  return (
    <div className="py-10 text-center text-sm text-black/60">
      {message}
    </div>
  );
}
