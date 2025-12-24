// src/components/sections/SectionTitle.jsx
export default function SectionTitle({ children }) {
  return (
    <h2
      className="font-semibold text-[18px] text-[#1D1B1A] mb-2"
      style={{ fontFamily: "var(--cliente-heading)" }}
    >
      {children}
    </h2>
  );
}
