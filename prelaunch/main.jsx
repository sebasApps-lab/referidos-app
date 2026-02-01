import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import WaitlistPage from "../src/waitlist/WaitlistPage";
import "../src/waitlist/prelaunch.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <WaitlistPage />
    </BrowserRouter>
  </React.StrictMode>
);
