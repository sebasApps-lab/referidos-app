import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PrelaunchHomePageV2 from "./home/PrelaunchHomePageV2";
import PrelaunchHomePageV3 from "./home/PrelaunchHomePageV3";
import PrelaunchHomePageV4 from "./home/PrelaunchHomePageV4";
import PrelaunchHomePageV5 from "./home/PrelaunchHomePageV5";
import BlankPrelaunchPage from "./home/BlankPrelaunchPage";
import LandingPruebaPage from "./home/LandingPruebaPage";
import LandingPrueba2Page from "./home/LandingPrueba2Page";
import AnimaPrototypePage from "./home/AnimaPrototypePage";
import FigmaPrototypePage from "./home/FigmaPrototypePage";
import ReferenciaPage from "./home/ReferenciaPage";
import WaitlistPage from "./waitlist/WaitlistPage";
import LegalHomePage from "./waitlist/legal/LegalHomePage";
import LegalDocPage from "./waitlist/legal/LegalDocPage";
import SupportChatPage from "./support/SupportChatPage";
import SupportEmailPage from "./support/SupportEmailPage";
import FeedbackPage from "./support/FeedbackPage";
import { initPrelaunchObservability } from "./observability/prelaunchObservability";
import "./waitlist/prelaunch.css";

initPrelaunchObservability();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BlankPrelaunchPage />} />
        <Route path="/v2" element={<PrelaunchHomePageV2 />} />
        <Route path="/v3" element={<PrelaunchHomePageV3 />} />
        <Route path="/v4" element={<PrelaunchHomePageV4 />} />
        <Route path="/v5" element={<PrelaunchHomePageV5 />} />
        <Route path="/landing-prueba" element={<LandingPruebaPage />} />
        <Route path="/landing-prueba2" element={<LandingPrueba2Page />} />
        <Route path="/anima-prototype" element={<AnimaPrototypePage />} />
        <Route path="/figma-prototype" element={<FigmaPrototypePage />} />
        <Route path="/referencia" element={<ReferenciaPage />} />
        <Route path="/es" element={<Navigate to="/" replace />} />
        <Route path="/cliente-legacy" element={<WaitlistPage forcedMode="cliente" />} />
        <Route path="/negocio-legacy" element={<WaitlistPage forcedMode="negocio" />} />
        <Route path="/soporte-chat" element={<SupportChatPage />} />
        <Route path="/soporte-correo" element={<SupportEmailPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/soporte-ticket" element={<Navigate to="/soporte-chat" replace />} />
        <Route path="/legal/es" element={<LegalHomePage />} />
        <Route path="/legal/es/:doc" element={<LegalDocPage />} />
        <Route path="/legal/*" element={<Navigate to="/legal/es" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


