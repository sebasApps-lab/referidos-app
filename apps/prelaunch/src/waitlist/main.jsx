// src/waitlist/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import WaitlistPage from "./WaitlistPage";
import LegalHomePage from "./legal/LegalHomePage";
import LegalDocPage from "./legal/LegalDocPage";
import SupportChatPage from "../support/SupportChatPage";
import SupportEmailPage from "../support/SupportEmailPage";
import "./prelaunch.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WaitlistPage />} />
        <Route path="/es" element={<WaitlistPage />} />
        <Route path="/soporte-chat" element={<SupportChatPage />} />
        <Route path="/soporte-correo" element={<SupportEmailPage />} />
        <Route path="/soporte-ticket" element={<SupportChatPage />} />
        <Route path="/legal/es" element={<LegalHomePage />} />
        <Route path="/legal/es/:doc" element={<LegalDocPage />} />
        <Route path="/legal/*" element={<Navigate to="/legal/es" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
