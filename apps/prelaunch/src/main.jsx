import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { runtimeConfig } from "./config/runtimeConfig";
import TreeProvider from "./UI-detect/TreeProvider";
import WaitlistLandingPage from "./waitlist-landing/WaitlistLandingPage";

const HelpCenterPage = lazy(() => import("./legal/HelpCenterPage"));
const HelpCenterCategoryPage = lazy(() => import("./legal/HelpCenterCategoryPage"));
const HelpCenterArticlePage = lazy(() => import("./legal/HelpCenterArticlePage"));
const HelpCenterBusinessPage = lazy(() => import("./legal/HelpCenterBusinessPage"));
const HelpCenterBusinessCategoryPage = lazy(() =>
  import("./legal/HelpCenterBusinessCategoryPage"),
);
const HelpCenterBusinessArticlePage = lazy(() =>
  import("./legal/HelpCenterBusinessArticlePage"),
);
const SupportOpenTicketPage = lazy(() => import("./support/SupportOpenTicketPage"));
const FeedbackRoute = lazy(() => import("./support/FeedbackRoute"));
const BusinessLandingPage = lazy(() => import("./business-landing/BusinessLandingPage"));
const ComponentsPlaygroundPage = lazy(() =>
  import("./components-playground/ComponentsPlaygroundPage"),
);

function startPrelaunchObservability() {
  if (typeof window === "undefined") {
    return;
  }

  const boot = () => {
    void import("./observability/prelaunchObservability")
      .then(({ initPrelaunchObservability }) => {
        initPrelaunchObservability();
      })
      .catch(() => {});
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(boot, { timeout: 1500 });
    return;
  }

  window.setTimeout(boot, 400);
}

startPrelaunchObservability();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TreeProvider>
      <BrowserRouter>
        <Suspense fallback={<div className="waitlist-landing-route-fallback" aria-hidden="true" />}>
          <Routes>
            <Route path="/" element={<WaitlistLandingPage />} />
            {!runtimeConfig.isProd ? (
              <Route path="/components" element={<ComponentsPlaygroundPage />} />
            ) : null}
            {!runtimeConfig.isProd ? (
              <Route path="/negocios" element={<BusinessLandingPage />} />
            ) : null}
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
            <Route path="/soporte/abrir-ticket" element={<SupportOpenTicketPage />} />
            <Route
              path="/soporte-chat"
              element={<Navigate to="/soporte/abrir-ticket" replace />}
            />
            <Route
              path="/soporte-correo"
              element={<Navigate to="/soporte/abrir-ticket" replace />}
            />
            <Route path="/feedback" element={<FeedbackRoute />} />
            <Route path="/ayuda/*" element={<Navigate to="/ayuda/es" replace />} />
            <Route
              path="/ayuda-negocios/*"
              element={<Navigate to="/ayuda-negocios/es" replace />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TreeProvider>
  </React.StrictMode>,
);
