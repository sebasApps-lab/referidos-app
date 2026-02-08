import SearchEmpty from "./SearchEmpty";

export default function SearchResults({
  title,
  showTitle = true,
  items = [],
  renderItem,
  emptyState,
  showEmpty = true,
  wrapperClassName = "",
  listClassName = "",
  titleClassName = "",
}) {
  return (
    <div className={wrapperClassName}>
      {showTitle && title ? (
        <h3 className={titleClassName}>{title}</h3>
      ) : null}
      {items.length > 0 ? (
        <div className={listClassName}>{items.map(renderItem)}</div>
      ) : showEmpty ? (
        emptyState || <SearchEmpty />
      ) : null}
    </div>
  );
}
