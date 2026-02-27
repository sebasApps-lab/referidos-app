import React from "react";
import { Link } from "react-router-dom";
import AuthCard from "../blocks/AuthCard";
import AuthHeader from "../blocks/AuthHeader";
import ErrorBanner from "../blocks/ErrorBanner";
import OAuthButtons from "../blocks/OAuthButtons";

export default function WelcomeStep({
  error,
  loading,
  oauthLoading,
  oauthProvider,
  enableApple = false,
  onEmail,
  onGoogle,
  onFacebook,
  onApple,
  onTwitter,
  onDiscord,
}) {
  return (
    <div className="relative w-full max-w-sm">
      <AuthCard className="p-6">
        {error && <ErrorBanner message={error} className="mb-3 text-center" />}

        <div className="space-y-4">
          <AuthHeader
            title="Elige como continuar..."
            subtitle="Si ya tienes cuenta, elige una opción y entrarás automaticamente."
            titleClassName="text-center text-xl font-bold text-[#5E30A5] mb-1"
            subtitleClassName="text-center text-sm text-gray-500 mb-4"
          />

          <Link
            to="/auth"
            onClick={onEmail}
            className="w-full block bg-[#FFC21C] text-white font-semibold py-3 rounded-lg shadow active:scale-[0.98]"
          >
            <div className="flex items-center justify-center gap-2">
              <MailIcon />
              <span>Continuar con correo</span>
            </div>
          </Link>

          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span
              className="flex-1 h-px"
              style={{ background: "linear-gradient(270deg, rgba(173, 173, 173, 0.9) 0%, rgba(209,213,219,0.75) 95%, rgba(194, 194, 194, 0.2) 100%)" }}
            />
            <span className="font-semibold">O</span>
            <span
              className="flex-1 h-px"
              style={{ background: "linear-gradient(90deg, rgba(173, 173, 173, 0.9) 0%, rgba(209,213,219,0.75) 95%, rgba(194, 194, 194, 0.2) 100%)" }}
            />
          </div>

          <OAuthButtons
            loading={loading}
            oauthLoading={oauthLoading}
            oauthProvider={oauthProvider}
            enableApple={enableApple}
            onGoogle={onGoogle}
            onFacebook={onFacebook}
            onApple={onApple}
            onTwitter={onTwitter}
            onDiscord={onDiscord}
          />

          <div className="text-center pt-2 text-sm text-gray-500">
            Si eres nuevo, te ayudaremos a{" "}
            <Link to="/auth" className="text-sm text-[#5E30A5] font-bold">
              crear tu cuenta.
            </Link>
          </div>
        </div>
      </AuthCard>
    </div>
  );
}

function MailIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      height="24"
      width="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 7l7.82 6.165a2 2 0 002.36 0L22 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
