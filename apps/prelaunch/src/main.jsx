import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HelpCenterPage from "./legal/HelpCenterPage";
import HelpCenterCategoryPage from "./legal/HelpCenterCategoryPage";
import HelpCenterArticlePage from "./legal/HelpCenterArticlePage";
import HelpCenterBusinessPage from "./legal/HelpCenterBusinessPage";
import HelpCenterBusinessCategoryPage from "./legal/HelpCenterBusinessCategoryPage";
import HelpCenterBusinessArticlePage from "./legal/HelpCenterBusinessArticlePage";
import SupportChatPage from "./support/SupportChatPage";
import SupportEmailPage from "./support/SupportEmailPage";
import FeedbackPage from "./support/FeedbackPage";
import { initPrelaunchObservability } from "./observability/prelaunchObservability";
import BusinessLandingPage from "./business-landing/BusinessLandingPage";
import ComponentsPlaygroundPage from "./components-playground/ComponentsPlaygroundPage";
import WaitlistLandingPage from "./waitlist-landing/WaitlistLandingPage";

initPrelaunchObservability();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WaitlistLandingPage />} />
        <Route path="/components" element={<ComponentsPlaygroundPage />} />
        <Route path="/negocios" element={<BusinessLandingPage />} />
        <Route path="/ayuda/es" element={<HelpCenterPage />} />
        <Route path="/ayuda/es/categoria/:category" element={<HelpCenterCategoryPage />} />
        <Route path="/ayuda/es/articulo/:doc" element={<HelpCenterArticlePage />} />
        <Route path="/ayuda-negocios/es" element={<HelpCenterBusinessPage />} />
        <Route
          path="/ayuda-negocios/es/categoria/:category"
          element={<HelpCenterBusinessCategoryPage />}
        />
        <Route
          path="/ayuda-negocios/es/articulo/:doc"
          element={<HelpCenterBusinessArticlePage />}
        />
        <Route path="/soporte-chat" element={<SupportChatPage />} />
        <Route path="/soporte-correo" element={<SupportEmailPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/ayuda/*" element={<Navigate to="/ayuda/es" replace />} />
        <Route path="/ayuda-negocios/*" element={<Navigate to="/ayuda-negocios/es" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
