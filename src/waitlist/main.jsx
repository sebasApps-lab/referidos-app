// src/waitlist/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import WaitlistPage from "./WaitlistPage";
import "./prelaunch.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <WaitlistPage />
    </BrowserRouter>
  </React.StrictMode>
);
