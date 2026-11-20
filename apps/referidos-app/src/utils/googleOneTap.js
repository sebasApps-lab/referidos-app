const SCRIPT_SRC = "https://accounts.google.com/gsi/client";
const SCRIPT_TIMEOUT_MS = 8_000;
const PROMPT_TIMEOUT_MS = 20_000;

let loaderPromise = null;

function loadGoogleClient() {
  if (window.google?.accounts?.id) {
    return Promise.resolve(window.google.accounts.id);
  }
  if (loaderPromise) return loaderPromise;

  const existingScript = document.querySelector("script[data-google-one-tap]");
  const script = existingScript || document.createElement("script");
  loaderPromise = new Promise((resolve, reject) => {
    const cleanup = () => {
      window.clearTimeout(timeout);
      script.removeEventListener("load", onLoad);
      script.removeEventListener("error", onError);
    };
    const onError = () => {
      cleanup();
      script.remove();
      reject(new Error("No se pudo cargar Google One Tap"));
    };
    const onLoad = () => {
      const client = window.google?.accounts?.id;
      if (!client) {
        onError();
        return;
      }
      cleanup();
      resolve(client);
    };
    const timeout = window.setTimeout(onError, SCRIPT_TIMEOUT_MS);

    script.addEventListener("load", onLoad);
    script.addEventListener("error", onError);
    if (!existingScript) {
      script.src = SCRIPT_SRC;
      script.async = true;
      script.dataset.googleOneTap = "true";
      document.head.appendChild(script);
    }
  }).finally(() => {
    loaderPromise = null;
  });

  return loaderPromise;
}

const toHex = (bytes) =>
  Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");

async function createNonce() {
  const nonce = toHex(globalThis.crypto.getRandomValues(new Uint8Array(32)));
  const digest = await globalThis.crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(nonce),
  );
  return { nonce, googleNonce: toHex(new Uint8Array(digest)) };
}

export async function requestGoogleCredential({ clientId, context = "signin" }) {
  if (!clientId || typeof window === "undefined" || !globalThis.crypto?.subtle) {
    return { type: "unavailable" };
  }

  const [google, { nonce, googleNonce }] = await Promise.all([
    loadGoogleClient(),
    createNonce(),
  ]);

  return new Promise((resolve) => {
    let settled = false;

    const finish = (result) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      resolve(result);
    };

    // FedCM can suppress status notifications. Recover when no result arrives.
    const timeout = window.setTimeout(() => {
      finish({ type: "unavailable" });
      google.cancel?.();
    }, PROMPT_TIMEOUT_MS);

    try {
      google.initialize({
        client_id: clientId,
        nonce: googleNonce,
        context,
        callback: (response) => {
          if (response?.credential) {
            finish({ type: "credential", credential: response.credential, nonce });
          } else {
            finish({ type: "unavailable" });
          }
        },
        cancel_on_tap_outside: true,
        use_fedcm_for_prompt: true,
      });

      google.prompt((notification) => {
        if (notification.isNotDisplayed?.() || notification.isSkippedMoment?.()) {
          finish({ type: "unavailable" });
        } else if (
          notification.isDismissedMoment?.() &&
          notification.getDismissedReason?.() !== "credential_returned"
        ) {
          finish({ type: "cancelled" });
        }
      });
    } catch {
      finish({ type: "unavailable" });
    }
  });
}
