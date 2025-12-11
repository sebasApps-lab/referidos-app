// Lightweight helper to load and trigger Google One Tap
const SCRIPT_SRC = "https://accounts.google.com/gsi/client";
let loaderPromise = null;

function ensureBrowser() {
  if (typeof window === "undefined") {
    throw new Error("Google One Tap solo esta disponible en navegador");
  }
}

function loadGoogleClient() {
  ensureBrowser();
  if (window.google?.accounts?.id) return Promise.resolve(window.google);
  if (loaderPromise) return loaderPromise;

  loaderPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector("script[data-google-one-tap]");
    if (existing) {
      existing.addEventListener("load", () => resolve(window.google));
      existing.addEventListener("error", () => reject(new Error("No se pudo cargar Google One Tap")));
      return;
    }

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.dataset.googleOneTap = "true";
    script.onload = () => resolve(window.google);
    script.onerror = () => reject(new Error("No se pudo cargar Google One Tap"));
    document.head.appendChild(script);
  });

  return loaderPromise;
}

export async function requestGoogleCredential({ clientId, context = "signin" }) {
  if (!clientId) throw new Error("Falta GOOGLE_CLIENT_ID para One Tap");
  const google = await loadGoogleClient();

  return new Promise((resolve, reject) => {
    let settled = false;

    const finish = (payload, isError = false) => {
      if (settled) return;
      settled = true;
      if (isError) reject(payload);
      else resolve(payload);
    };

    google.accounts.id.initialize({
      client_id: clientId,
      callback: (response) => {
        if (settled) return;
        if (response?.credential) {
          finish({ type: "credential", credential: response.credential });
        } else {
          finish(new Error("No se pudo obtener credencial de Google"), true);
        }
      },
      cancel_on_tap_outside: true,
      use_fedcm_for_prompt: true,
      context,
    });

    google.accounts.id.prompt((notification) => {
      if (settled) return;
      if (notification.isNotDisplayed?.() || notification.isSkippedMoment?.()) {
        finish(new Error("No se pudo mostrar Google One Tap"), true);
        return;
      }
      if (notification.isDismissedMoment?.()) {
        const reason =
          notification.getDismissedReason?.() ||
          notification.getNotDisplayedReason?.() ||
          notification.dismissedReason ||
          "dismissed";
        if (reason === "credential_returned") return;
        finish({ type: "dismissed", reason });
      }
    });
  });
}
