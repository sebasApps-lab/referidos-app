// src/components/FooterNav.jsx
import { Link } from "react-router-dom";

export default function FooterNav() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md flex justify-around py-2">
      <Link to="/cliente" className="text-[#5E30A5] font-medium">Inicio</Link>
      <Link to="/scanner" className="text-[#5E30A5] font-medium">Escanear</Link>
      <Link to="/qr-validos" className="text-[#5E30A5] font-medium">Mis QR</Link>
    </div>
  );
}
