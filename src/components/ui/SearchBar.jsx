export default function SearchBar({ value, onChange, onFilters }) {
  return (
    <div style={{ padding: "0 2px", marginBottom: 0 }}>
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
          style={{
            border: 0,
            outline: "none",
            background: "transparent",
            fontWeight: 600,
            color: "#5E30A5",
            width: "100%",
          }}
        />

        <button
          type="button"
          onClick={onFilters}
          style={{
            background: "transparent",
            border: "none",
            marginLeft: 10,
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
  );
}
