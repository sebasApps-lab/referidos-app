import React, { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { supabase } from "@shared/services/mobileApi";
import { useAppStore } from "@shared/store/appStore";
import { useSecurityStore } from "@shared/store/securityStore";
import {
  configurePinAccess,
  confirmSensitiveReauth,
  disableBiometricAccess,
  disablePinAccess,
  enrollBiometricAccess,
  requireSecurityForAction,
  sendSensitiveReauthEmail,
  unlockWithBiometricAccess,
  verifyPinAndUnlock,
} from "@shared/security/localAccessSecurity";
import { readFirst } from "@shared/services/entityQueries";

type Props = {
  usuario: any;
  onReload: () => Promise<void> | void;
};

function isValidEmail(value: string) {
  const text = String(value || "").trim();
  return /^\S+@\S+\.\S+$/.test(text);
}

export default function AccessSecurityPanel({ usuario, onReload }: Props) {
  const accessMethods = useAppStore((state) => state.accessMethods);
  const setAccessMethods = useAppStore((state) => state.setAccessMethods);
  const unlockLevelRaw = useSecurityStore((state) => state.unlockLevel);
  const unlockMethod = useSecurityStore((state) => state.unlockMethod);
  const unlockExpiresAt = useSecurityStore((state) => state.unlockExpiresAt);

  const [pinSetup, setPinSetup] = useState("");
  const [pinVerify, setPinVerify] = useState("");
  const [reauthSending, setReauthSending] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const authUserId = String(readFirst(usuario, ["id_auth", "idAuth"], "")).trim();
  const userRowId = String(readFirst(usuario, ["id"], "")).trim();
  const userEmail = String(readFirst(usuario, ["email"], "")).trim();

  const unlockLevel =
    unlockExpiresAt && Date.now() > unlockExpiresAt ? "LOCKED" : unlockLevelRaw;
  const unlockExpiresLabel = useMemo(() => {
    if (!unlockExpiresAt) return "-";
    return new Date(unlockExpiresAt).toLocaleTimeString();
  }, [unlockExpiresAt]);

  const requireSensitive = (action: string) => {
    const requirement = requireSecurityForAction(action);
    if (requirement.ok) return true;
    setError(
      requirement.pendingMethod === "password"
        ? "Esta accion requiere reautenticacion sensible (correo/password)."
        : "Esta accion requiere desbloqueo local.",
    );
    return false;
  };

  const runAction = async (fn: () => Promise<void>) => {
    setError("");
    setInfo("");
    setActionLoading(true);
    try {
      await fn();
    } finally {
      setActionLoading(false);
    }
  };

  const handleSavePin = () =>
    runAction(async () => {
      if (!requireSensitive("change_access_methods")) return;
      const result = await configurePinAccess({
        authUserId,
        userRowId,
        pin: pinSetup,
      });
      if (!result.ok) {
        setError(result.error || "No se pudo guardar PIN.");
        return;
      }
      setPinSetup("");
      setAccessMethods({ pin: true });
      setInfo("PIN guardado en este dispositivo.");
      await onReload();
    });

  const handleVerifyPin = () =>
    runAction(async () => {
      const result = await verifyPinAndUnlock({
        authUserId,
        pin: pinVerify,
      });
      if (!result.ok) {
        setError(result.error || "No se pudo validar PIN.");
        return;
      }
      setPinVerify("");
      setInfo("PIN validado. Desbloqueo local activo.");
    });

  const handleDisablePin = () =>
    runAction(async () => {
      if (!requireSensitive("change_access_methods")) return;
      const result = await disablePinAccess({ authUserId, userRowId });
      if (!result.ok) {
        setError(result.error || "No se pudo desactivar PIN.");
        return;
      }
      setAccessMethods({ pin: false });
      setInfo("PIN desactivado.");
      await onReload();
    });

  const handleEnrollBiometric = () =>
    runAction(async () => {
      if (!requireSensitive("change_access_methods")) return;
      const result = await enrollBiometricAccess({ authUserId, userRowId });
      if (!result.ok) {
        setError(result.error || "No se pudo activar biometria.");
        return;
      }
      setAccessMethods({ fingerprint: true });
      setInfo("Biometria activada para desbloqueo local.");
      await onReload();
    });

  const handleUnlockBiometric = () =>
    runAction(async () => {
      const result = await unlockWithBiometricAccess({ authUserId });
      if (!result.ok) {
        setError(result.error || "No se pudo validar biometria.");
        return;
      }
      setInfo("Biometria validada. Desbloqueo local activo.");
    });

  const handleDisableBiometric = () =>
    runAction(async () => {
      if (!requireSensitive("change_access_methods")) return;
      const result = await disableBiometricAccess({ authUserId, userRowId });
      if (!result.ok) {
        setError(result.error || "No se pudo desactivar biometria.");
        return;
      }
      setAccessMethods({ fingerprint: false });
      setInfo("Biometria desactivada.");
      await onReload();
    });

  const handleSendReauthEmail = async () => {
    setError("");
    setInfo("");
    if (!isValidEmail(userEmail)) {
      setError("No hay correo valido para reautenticacion.");
      return;
    }
    setReauthSending(true);
    const result = await sendSensitiveReauthEmail(userEmail);
    setReauthSending(false);
    if (!result.ok) {
      setError(result.error || "No se pudo enviar correo de reautenticacion.");
      return;
    }
    setInfo("Correo de reautenticacion enviado.");
  };

  const handleConfirmReauth = () => {
    confirmSensitiveReauth();
    setError("");
    setInfo("Reautenticacion sensible confirmada en sesion local.");
  };

  const handleChangeEmail = () =>
    runAction(async () => {
      if (!requireSensitive("change_email")) return;
      if (!isValidEmail(newEmail)) {
        setError("Ingresa un correo valido.");
        return;
      }
      const { error: updateError } = await supabase.auth.updateUser({ email: newEmail.trim() });
      if (updateError) {
        setError(updateError.message || "No se pudo iniciar cambio de correo.");
        return;
      }
      setInfo("Cambio de correo iniciado. Revisa tu bandeja para confirmar.");
      setNewEmail("");
      await onReload();
    });

  const handleChangePassword = () =>
    runAction(async () => {
      if (!requireSensitive("change_password")) return;
      if (newPassword.length < 8) {
        setError("La contrasena debe tener minimo 8 caracteres.");
        return;
      }
      if (!/\d/.test(newPassword) || !/[^A-Za-z0-9]/.test(newPassword)) {
        setError("La contrasena debe incluir numero y simbolo.");
        return;
      }
      if (newPassword !== newPasswordConfirm) {
        setError("Las contrasenas no coinciden.");
        return;
      }
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (updateError) {
        setError(updateError.message || "No se pudo actualizar contrasena.");
        return;
      }
      setInfo("Contrasena actualizada.");
      setNewPassword("");
      setNewPasswordConfirm("");
      setAccessMethods({ password: true });
      await onReload();
    });

  return (
    <View style={styles.wrap}>
      <View style={styles.statusCard}>
        <Text style={styles.cardTitle}>Estado de desbloqueo</Text>
        <Text style={styles.meta}>Nivel: {unlockLevel}</Text>
        <Text style={styles.meta}>Metodo: {unlockMethod}</Text>
        <Text style={styles.meta}>Expira: {unlockExpiresLabel}</Text>
      </View>

      <View style={styles.statusCard}>
        <Text style={styles.cardTitle}>Metodos habilitados</Text>
        <Text style={styles.meta}>Password: {accessMethods.password ? "si" : "no"}</Text>
        <Text style={styles.meta}>PIN: {accessMethods.pin ? "si" : "no"}</Text>
        <Text style={styles.meta}>Biometria: {accessMethods.fingerprint ? "si" : "no"}</Text>
      </View>

      <View style={styles.statusCard}>
        <Text style={styles.cardTitle}>PIN local</Text>
        <TextInput
          style={styles.input}
          value={pinSetup}
          onChangeText={(value) => setPinSetup(value.replace(/\D/g, "").slice(0, 4))}
          placeholder="Nuevo PIN (4 digitos)"
          keyboardType="number-pad"
        />
        <View style={styles.row}>
          <Pressable
            onPress={handleSavePin}
            disabled={actionLoading || pinSetup.length !== 4}
            style={[styles.primaryBtn, (actionLoading || pinSetup.length !== 4) && styles.btnDisabled]}
          >
            <Text style={styles.primaryBtnText}>Guardar PIN</Text>
          </Pressable>
          <Pressable
            onPress={handleDisablePin}
            disabled={actionLoading || !accessMethods.pin}
            style={[styles.outlineBtn, (actionLoading || !accessMethods.pin) && styles.btnDisabled]}
          >
            <Text style={styles.outlineBtnText}>Desactivar</Text>
          </Pressable>
        </View>

        <TextInput
          style={styles.input}
          value={pinVerify}
          onChangeText={(value) => setPinVerify(value.replace(/\D/g, "").slice(0, 4))}
          placeholder="Validar PIN para desbloqueo local"
          keyboardType="number-pad"
        />
        <Pressable
          onPress={handleVerifyPin}
          disabled={actionLoading || pinVerify.length !== 4}
          style={[styles.secondaryBtn, (actionLoading || pinVerify.length !== 4) && styles.btnDisabled]}
        >
          <Text style={styles.secondaryBtnText}>Validar PIN</Text>
        </Pressable>
      </View>

      <View style={styles.statusCard}>
        <Text style={styles.cardTitle}>Biometria local</Text>
        <View style={styles.row}>
          <Pressable
            onPress={handleEnrollBiometric}
            disabled={actionLoading}
            style={[styles.primaryBtn, actionLoading && styles.btnDisabled]}
          >
            <Text style={styles.primaryBtnText}>Activar biometria</Text>
          </Pressable>
          <Pressable
            onPress={handleDisableBiometric}
            disabled={actionLoading || !accessMethods.fingerprint}
            style={[styles.outlineBtn, (actionLoading || !accessMethods.fingerprint) && styles.btnDisabled]}
          >
            <Text style={styles.outlineBtnText}>Desactivar</Text>
          </Pressable>
        </View>
        <Pressable
          onPress={handleUnlockBiometric}
          disabled={actionLoading || !accessMethods.fingerprint}
          style={[styles.secondaryBtn, (actionLoading || !accessMethods.fingerprint) && styles.btnDisabled]}
        >
          <Text style={styles.secondaryBtnText}>Usar biometria</Text>
        </Pressable>
      </View>

      <View style={styles.statusCard}>
        <Text style={styles.cardTitle}>Reautenticacion sensible</Text>
        <Text style={styles.meta}>Correo: {userEmail || "-"}</Text>
        <View style={styles.row}>
          <Pressable
            onPress={handleSendReauthEmail}
            disabled={reauthSending}
            style={[styles.secondaryBtn, reauthSending && styles.btnDisabled]}
          >
            <Text style={styles.secondaryBtnText}>
              {reauthSending ? "Enviando..." : "Enviar correo"}
            </Text>
          </Pressable>
          <Pressable onPress={handleConfirmReauth} style={styles.outlineBtn}>
            <Text style={styles.outlineBtnText}>Confirmar reauth</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.statusCard}>
        <Text style={styles.cardTitle}>Cambios sensibles (guardados)</Text>
        <TextInput
          style={styles.input}
          value={newEmail}
          onChangeText={setNewEmail}
          placeholder="Nuevo correo"
          autoCapitalize="none"
        />
        <Pressable
          onPress={handleChangeEmail}
          disabled={actionLoading || !newEmail.trim()}
          style={[styles.secondaryBtn, (actionLoading || !newEmail.trim()) && styles.btnDisabled]}
        >
          <Text style={styles.secondaryBtnText}>Cambiar correo</Text>
        </Pressable>

        <TextInput
          style={styles.input}
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="Nueva contrasena"
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          value={newPasswordConfirm}
          onChangeText={setNewPasswordConfirm}
          placeholder="Confirmar contrasena"
          secureTextEntry
        />
        <Pressable
          onPress={handleChangePassword}
          disabled={actionLoading || !newPassword || !newPasswordConfirm}
          style={[
            styles.secondaryBtn,
            (actionLoading || !newPassword || !newPasswordConfirm) && styles.btnDisabled,
          ]}
        >
          <Text style={styles.secondaryBtnText}>Cambiar contrasena</Text>
        </Pressable>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}
      {info ? <Text style={styles.info}>{info}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 10,
  },
  statusCard: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    padding: 10,
    gap: 8,
  },
  cardTitle: {
    color: "#111827",
    fontSize: 13,
    fontWeight: "700",
  },
  meta: {
    color: "#4B5563",
    fontSize: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 9,
    fontSize: 12,
    color: "#111827",
    backgroundColor: "#FFFFFF",
  },
  row: {
    flexDirection: "row",
    gap: 8,
  },
  primaryBtn: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 9,
    backgroundColor: "#6D28D9",
    alignItems: "center",
  },
  primaryBtnText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: "#6D28D9",
    borderRadius: 8,
    paddingVertical: 9,
    alignItems: "center",
    backgroundColor: "#F5F3FF",
  },
  secondaryBtnText: {
    color: "#5B21B6",
    fontSize: 12,
    fontWeight: "700",
  },
  outlineBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingVertical: 9,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  outlineBtnText: {
    color: "#374151",
    fontSize: 12,
    fontWeight: "700",
  },
  btnDisabled: {
    opacity: 0.5,
  },
  error: {
    color: "#B91C1C",
    fontSize: 12,
    fontWeight: "600",
  },
  info: {
    color: "#047857",
    fontSize: 12,
    fontWeight: "600",
  },
});
