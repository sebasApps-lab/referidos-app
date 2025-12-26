export default function SearchBar({
  value,
  onChange,
  onFilters,
  onFocus,
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
        <div
          style={{
            background: "#F5F5F7",
            borderRadius: 9999,
            padding: "7px 14px",
            display: "flex",
            alignItems: "center",
            boxShadow: "0 6px 14px rgba(16,24,40,0.03)",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            stroke="#5E30A5"
            strokeWidth="2"
            style={{ marginRight: 10 }}
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
            autoFocus={autoFocus}
            style={{
              border: 0,
              outline: "none",
              background: "transparent",
              fontWeight: 600,
              color: "#5E30A5",
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
        </div>
      </div>
    </div>
  );
}
