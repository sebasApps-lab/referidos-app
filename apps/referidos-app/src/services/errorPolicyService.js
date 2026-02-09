import { useAppStore } from "../store/appStore";
import { useModalStore } from "../modals/modalStore";
import { revokeAllSessions } from "./sessionDevicesService";
import { beginPolicyAction, endPolicyAction } from "./loggingClient";

const SENSITIVE_REAUTH_RULES = {
  transfer_points: "reauth_sensitive",
  redeem_qr: "reauth_sensitive",
  update_profile: "reauth_sensitive",
  admin_sensitive_action: "reauth_sensitive",
};

const MESSAGE_BY_KEY = {
  session_revoked:
    "Tu sesion ya no es valida en este dispositivo. Vuelve a iniciar sesion.",
  session_unregistered:
    "No pudimos validar tu sesion en este dispositivo. Inicia sesion otra vez.",
  auth_unauthorized: "Tu sesion expiro. Inicia sesion para continuar.",
  auth_token_invalid: "Tu sesion expiro. Inicia sesion para continuar.",
  network_error:
    "No hay conexion estable. Intenta de nuevo en unos segundos.",
  edge_unavailable:
    "El servicio no esta disponible temporalmente. Vuelve a intentar.",
  edge_timeout:
    "La operacion tardo demasiado. Intenta de nuevo en unos segundos.",
  policy_unavailable:
    "No pudimos validar la accion. Reintenta en unos segundos.",
  unknown_error:
    "Ocurrio un error inesperado. Puedes continuar y volver a intentar.",
};

function resolveMessage(policy = {}, event = {}) {
  const messageKey = policy?.ui?.message_key || event?.code || "unknown_error";
  return {
    title:
      policy?.auth?.signOut === "local" || policy?.auth?.signOut === "global"
        ? "Sesion expirada"
        : "Problema temporal",
    message: MESSAGE_BY_KEY[messageKey] || MESSAGE_BY_KEY.unknown_error,
  };
}

function shouldShowModal(policy = {}) {
  return Boolean(policy?.ui?.show && policy?.ui?.type === "modal");
}

async function maybeSignOut(policy = {}) {
  const action = policy?.auth?.signOut;
  if (action !== "local" && action !== "global") return;
  const appState = useAppStore.getState();
  if (action === "global") {
    try {
      await revokeAllSessions();
    } catch {
      // best effort
    }
  }
  await appState.logout();
}

function maybeDegradeUam(policy = {}) {
  if (policy?.uam?.degrade_to !== "reauth_sensitive") return;
  const security = useAppStore.getState().security;
  if (security?.setRules) {
    security.setRules({
      ...(security.rules || {}),
      ...SENSITIVE_REAUTH_RULES,
    });
  }
}

function maybeShowModal(policy = {}, event = {}) {
  if (!shouldShowModal(policy)) return;
  const { title, message } = resolveMessage(policy, event);
  useModalStore.getState().openModal("ConfirmAction", {
    title,
    message,
    confirmLabel: "Entendido",
    cancelLabel: "Cerrar",
  });
}

export async function executeErrorPolicy(event = {}) {
  const policy = event?.policy?.policy || event?.policy || {};
  const actionKey = `policy:${event?.code || "unknown_error"}:${event?.route || "-"}`;
  const canStart = beginPolicyAction(actionKey);
  if (!canStart) return { ok: false, code: "policy_in_flight" };

  try {
    maybeDegradeUam(policy);
    maybeShowModal(policy, event);
    await maybeSignOut(policy);
    return { ok: true };
  } finally {
    endPolicyAction(actionKey);
  }
}

