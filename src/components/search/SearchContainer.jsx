export default function SearchContainer({
  mode = "default",
  searchBar,
  results,
  children,
}) {
  return (
    <>
      {searchBar}
      {mode === "search" ? results : children}
    </>
  );
}
