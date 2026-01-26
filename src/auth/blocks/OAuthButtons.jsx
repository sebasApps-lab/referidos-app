import React from "react";

export default function OAuthButtons({
  onGoogle,
  onFacebook,
  onApple,
  onTwitter,
  onDiscord,
  loading,
  oauthLoading,
  oauthProvider,
}) {
  const disableAll = Boolean(loading || oauthLoading);
  const buttons = [
    {
      key: "google",
      label: "Continuar con Google",
      onClick: onGoogle,
      Icon: GoogleIcon,
    },
    {
      key: "facebook",
      label: "Continuar con Facebook",
      onClick: onFacebook,
      Icon: FacebookIcon,
    },
    {
      key: "apple",
      label: "Continuar con Apple",
      onClick: onApple,
      Icon: AppleIcon,
    },
    {
      key: "x",
      label: "Continuar con X",
      onClick: onTwitter,
      Icon: XIcon,
    },
    {
      key: "discord",
      label: "Continuar con Discord",
      onClick: onDiscord,
      Icon: DiscordIcon,
    },
  ].filter((btn) => Boolean(btn.onClick));

  return (
    <div className="flex items-center justify-center gap-3 flex-nowrap overflow-x-auto py-1">
      {buttons.map(({ key, label, onClick, Icon }) => {
        const isBusy =
          (key === "google" && loading) ||
          (oauthLoading && oauthProvider === key);
        return (
          <button
            key={key}
            type="button"
            onClick={onClick}
            disabled={disableAll}
            aria-label={label}
            aria-busy={isBusy}
            title={label}
            className={`h-12 w-12 shrink-0 rounded-xl border border-gray-300 bg-white shadow flex items-center justify-center transition-transform ${
              disableAll
                ? "opacity-60 cursor-not-allowed"
                : "active:scale-[0.98]"
            }`}
          >
            <Icon />
          </button>
        );
      })}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      height="18"
      viewBox="0 0 18 18"
      width="18"
    >
      <path
        d="M17.64 9.2045c0-.6381-.0573-1.2518-.1636-1.8409H9v3.4814h4.8436c-.2087 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9082c1.7018-1.5677 2.6836-3.8745 2.6836-6.6149z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.4673-.8059 5.9563-2.1818l-2.9082-2.2581c-.8059.54-1.834.8609-3.0481.8609-2.3455 0-4.3309-1.5841-5.0386-3.7105H.957v2.3318C2.4382 15.9836 5.4818 18 9 18z"
        fill="#34A853"
      />
      <path
        d="M3.9614 10.7105c-.18-.54-.2823-1.1172-.2823-1.7105 0-.5936.1023-1.1709.2823-1.7109V4.957H.957C.3473 6.1718 0 7.5473 0 9c0 1.4527.3473 2.8282.957 4.0436l3.0044-2.3331z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.5795c1.3214 0 2.5086.4541 3.4418 1.3459l2.5814-2.5818C13.4673.8577 11.43 0 9 0 5.4818 0 2.4382 2.0168.957 4.9568l3.0044 2.3318C4.6691 5.1636 6.6545 3.5795 9 3.5795z"
        fill="#EA4335"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      height="21"
      viewBox="0 0 24 24"
      width="21"
    >
      <path
        fill="#1877F2"
        d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 4.99 3.66 9.13 8.44 9.93v-7.03H7.9v-2.9h2.4V9.62c0-2.38 1.42-3.7 3.6-3.7 1.04 0 2.13.19 2.13.19v2.34h-1.2c-1.18 0-1.55.73-1.55 1.48v1.77h2.64l-.42 2.9h-2.22V22c4.78-.8 8.44-4.94 8.44-9.93z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      height="20"
      viewBox="0 0 24 24"
      width="20"
    >
      <path
        d="M16.365 1.43c0 1.14-.48 2.23-1.26 3.05-.84.89-2.21 1.58-3.37 1.48-.1-1.08.43-2.2 1.18-3 .83-.9 2.26-1.53 3.45-1.53z"
        fill="#000"
      />
      <path
        d="M20.39 17.12c-.53 1.21-.78 1.74-1.46 2.83-1 1.57-2.41 3.52-4.17 3.54-1.56.02-1.96-1.02-4.09-1.01-2.13 0-2.58 1.03-4.1 1-1.76-.02-3.1-1.78-4.1-3.34-2.79-4.37-3.08-9.5-1.36-12.17 1.22-1.9 3.15-3.01 4.96-3.01 1.85 0 3.01 1.02 4.54 1.02 1.49 0 2.4-1.02 4.52-1.02 1.61 0 3.32.88 4.54 2.39-3.98 2.18-3.33 8.03 1.72 9.77z"
        fill="#000"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      height="18"
      viewBox="0 0 24 24"
      width="18"
    >
      <path
        d="M18.244 2H21l-6.27 7.163L22 22h-5.69l-4.49-6.59L6.16 22H3.39l6.7-7.35L2 2h5.69l4.1 6.08L18.244 2z"
        fill="#000"
      />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      height="18"
      viewBox="0 0 24 24"
      width="18"
    >
      <path
        d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.078.037c-.211.375-.444.864-.608 1.249a18.147 18.147 0 00-5.487 0 12.505 12.505 0 00-.617-1.249.077.077 0 00-.078-.037 19.736 19.736 0 00-4.885 1.515.07.07 0 00-.032.027C.533 9.046-.32 13.579.099 18.057a.082.082 0 00.031.056 19.911 19.911 0 006.064 3.04.077.077 0 00.084-.027c.467-.64.882-1.312 1.305-2.02a.076.076 0 00-.041-.106 13.106 13.106 0 01-1.888-.9.077.077 0 01-.008-.127c.127-.095.254-.192.371-.291a.074.074 0 01.077-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 01.078.009c.118.1.245.198.372.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.889.899.076.076 0 00-.04.107c.426.707.84 1.38 1.304 2.02a.076.076 0 00.084.028 19.876 19.876 0 006.065-3.04.077.077 0 00.031-.055c.5-5.177-.838-9.673-3.548-13.661a.061.061 0 00-.031-.028zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.174 1.094 2.157 2.418 0 1.334-.955 2.419-2.157 2.419zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.174 1.094 2.157 2.418 0 1.334-.946 2.419-2.157 2.419z"
        fill="#5865F2"
      />
    </svg>
  );
}
