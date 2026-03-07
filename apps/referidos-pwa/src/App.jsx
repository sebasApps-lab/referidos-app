import { Suspense } from "react";
import AppRoutes from "./routes";

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#5E30A5] text-white">
      Cargando...
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <AppRoutes />
    </Suspense>
  );
}
