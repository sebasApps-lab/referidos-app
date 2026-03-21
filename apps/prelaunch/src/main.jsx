import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HelpCenterPage from "./legal/HelpCenterPage";
import HelpCenterCategoryPage from "./legal/HelpCenterCategoryPage";
import HelpCenterArticlePage from "./legal/HelpCenterArticlePage";
import SupportChatPage from "./support/SupportChatPage";
import SupportEmailPage from "./support/SupportEmailPage";
import FeedbackPage from "./support/FeedbackPage";
import { initPrelaunchObservability } from "./observability/prelaunchObservability";
import WaitlistLandingPage from "./waitlist-landing/WaitlistLandingPage";

initPrelaunchObservability();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WaitlistLandingPage />} />
        <Route path="/ayuda/es" element={<HelpCenterPage />} />
        <Route path="/ayuda/es/categoria/:category" element={<HelpCenterCategoryPage />} />
        <Route path="/ayuda/es/articulo/:doc" element={<HelpCenterArticlePage />} />
        <Route path="/soporte-chat" element={<SupportChatPage />} />
        <Route path="/soporte-correo" element={<SupportEmailPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/ayuda/*" element={<Navigate to="/ayuda/es" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
