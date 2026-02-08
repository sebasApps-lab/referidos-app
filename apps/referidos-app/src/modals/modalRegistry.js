// src/modals/modalRegistry.js

import ModalTier from "../components/modals/ModalTier";
import ModalBeneficios from "../components/modals/ModalBeneficios";
import ModalCodigoNegocio from "../components/modals/ModalCodigoNegocio";
import ModalCuentaExistente from "../components/modals/ModalCuentaExistente";
import ModalAbandonarRegistro from "../components/modals/ModalAbandonarRegistro";
import ModalEliminarCuenta from "../components/modals/ModalEliminarCuenta";
import ModalSplashChoiceOverlay from "../components/modals/ModalSplashChoiceOverlay";
import ModalSplashEmailConfirmation from "../components/modals/ModalSplashEmailConfirmation";
import ModalFingerprintPrompt from "../components/modals/ModalFingerprintPrompt";
import ModalNotifications from "../components/modals/ModalNotifications";
import ModalConfirmarCambios from "../components/modals/ModalConfirmarCambios";
import ModalLocationPermission from "../components/modals/ModalLocationPermission";
import ModalLocationDenied from "../components/modals/ModalLocationDenied";
import ModalLocationUnavailable from "../components/modals/ModalLocationUnavailable";
import ModalTimePicker from "../components/modals/ModalTimePicker";
import ModalAccountVerifySkip from "../components/modals/ModalAccountVerifySkip";
import ModalAccessMethods from "../components/modals/ModalAccessMethods";
import ModalConfirmAction from "../components/modals/ModalConfirmAction";
import ModalPinVerify from "../components/modals/ModalPinVerify";
import ModalEmailVerification from "../components/modals/ModalEmailVerification";
import ModalEmailReauth from "../components/modals/ModalEmailReauth";
import ModalPasswordReauth from "../components/modals/ModalPasswordReauth";
import ModalForcePasswordChange from "../components/modals/ModalForcePasswordChange";
import ModalSupportQueue from "../components/modals/ModalSupportQueue";
import ModalSupportQueueCancel from "../components/modals/ModalSupportQueueCancel";
import ModalTwoFAEnroll from "../components/modals/ModalTwoFAEnroll";
import ModalTwoFAVerify from "../components/modals/ModalTwoFAVerify";
import ModalTwoFADisable from "../components/modals/ModalTwoFADisable";

export const modalRegistry = {
  Tier: ModalTier,
  Beneficios: ModalBeneficios,
  CodigoNegocio: ModalCodigoNegocio,
  CuentaExistente: ModalCuentaExistente,
  AbandonarRegistro: ModalAbandonarRegistro,
  EliminarCuenta: ModalEliminarCuenta,
  SplashChoiceOverlay: ModalSplashChoiceOverlay,
  SplashEmailConfirmation: ModalSplashEmailConfirmation,
  FingerprintPrompt: ModalFingerprintPrompt,
  Notifications: ModalNotifications,
  ConfirmarCambios: ModalConfirmarCambios,
  LocationPermission: ModalLocationPermission,
  LocationDenied: ModalLocationDenied,
  LocationUnavailable: ModalLocationUnavailable,
  TimePicker: ModalTimePicker,
  AccountVerifySkip: ModalAccountVerifySkip,
  AccessMethods: ModalAccessMethods,
  ConfirmAction: ModalConfirmAction,
  PinVerify: ModalPinVerify,
  EmailVerification: ModalEmailVerification,
  EmailReauth: ModalEmailReauth,
  PasswordReauth: ModalPasswordReauth,
  ForcePasswordChange: ModalForcePasswordChange,
  SupportQueue: ModalSupportQueue,
  SupportQueueCancel: ModalSupportQueueCancel,
  TwoFAEnroll: ModalTwoFAEnroll,
  TwoFAVerify: ModalTwoFAVerify,
  TwoFADisable: ModalTwoFADisable,
};
