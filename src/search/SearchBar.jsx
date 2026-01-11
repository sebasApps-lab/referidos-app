export default function SearchBar({
  value,
  onChange,
  onFilters,
  onFocus,
  onBlur,
  onCancel,
  showBack = false,
  autoFocus = false,
}) {
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
      return;
    }
    onChange?.("");
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {showBack ? (
        <button
          type="button"
          onClick={handleCancel}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
          aria-label="Volver"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      ) : null}
      <div style={{ padding: "0 2px", marginBottom: 0, width: "100%" }}>
        <div className="search-input-shell">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            style={{ marginRight: 10 }}
            className="search-input-icon"
            fill="none"
          >
            <circle cx="11" cy="11" r="6" />
            <path d="M21 21l-4.35-4.35" />
          </svg>

          <input
            placeholder="Buscar local"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
            autoFocus={autoFocus}
            className="search-input-field"
            style={{
              width: "100%",
            }}
          />

          {value ? (
            <button
              type="button"
              onClick={() => onChange("")}
              style={{
                background: "transparent",
                border: "none",
                marginLeft: 6,
                cursor: "pointer",
              }}
              aria-label="Borrar busqueda"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6B6B6B"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          ) : null}

          {onFilters ? (
            <button
              type="button"
              onClick={onFilters}
              style={{
                background: "transparent",
                border: "none",
                marginLeft: 8,
                cursor: "pointer",
              }}
              aria-label="Abrir filtros"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6B6B6B"
                strokeWidth="1.6"
              >
                <path d="M4 6h16M7 12h10M10 18h4" />
              </svg>
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
