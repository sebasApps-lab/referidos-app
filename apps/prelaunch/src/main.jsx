import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import BlankPrelaunchPage from "./home/BlankPrelaunchPage";
import FigmaPrototypePage from "./home/FigmaPrototypePage";
import HelpCenterPage from "./legal/HelpCenterPage";
import LegalDocPage from "./waitlist/legal/LegalDocPage";
import SupportChatPage from "./support/SupportChatPage";
import SupportEmailPage from "./support/SupportEmailPage";
import FeedbackPage from "./support/FeedbackPage";
import { initPrelaunchObservability } from "./observability/prelaunchObservability";

initPrelaunchObservability();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BlankPrelaunchPage />} />
        <Route path="/figma-prototype" element={<FigmaPrototypePage />} />
        <Route path="/ayuda" element={<HelpCenterPage />} />
        <Route path="/es" element={<Navigate to="/" replace />} />
        <Route path="/soporte-chat" element={<SupportChatPage />} />
        <Route path="/soporte-correo" element={<SupportEmailPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/soporte-ticket" element={<Navigate to="/soporte-chat" replace />} />
        <Route path="/legal/es" element={<Navigate to="/ayuda" replace />} />
        <Route path="/legal/es/:doc" element={<LegalDocPage />} />
        <Route path="/legal/*" element={<Navigate to="/legal/es" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
