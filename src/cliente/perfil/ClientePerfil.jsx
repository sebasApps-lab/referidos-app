import React, { useMemo } from "react";
import {
  AlertTriangle,
  Bell,
  Crown,
  Fingerprint,
  IdCard,
  Monitor,
  Palette,
  Shield,
  UserCircle,
} from "lucide-react";
import { useAppStore } from "../../store/appStore";
import { useClienteUI } from "../hooks/useClienteUI";
import ProfileTabs from "./shared/ProfileTabs";
import ProfilePanel from "./shared/ProfilePanel";
import ProfileOverview from "./shared/sections/ProfileOverview";
import PersonalData from "./shared/sections/PersonalData";
import Security from "./shared/sections/Security";
import TwoFA from "./shared/sections/TwoFA";
import Sessions from "./shared/sections/Sessions";
import Notifications from "./shared/sections/Notifications";
import Plan from "./shared/sections/Plan";
import DangerZone from "./shared/sections/DangerZone";
import Preferences from "./shared/sections/Preferences";

export default function ClientePerfil() {
  const usuario = useAppStore((s) => s.usuario);
  const setUser = useAppStore((s) => s.setUser);
  const { profileTab, setProfileTab } = useClienteUI({
    defaultProfileTab: "overview",
  });

  const tabs = useMemo(
    () => [
      {
        key: "overview",
        label: "Perfil",
        description: "Identidad y estado",
        icon: UserCircle,
      },
      {
        key: "personal",
        label: "Datos personales",
        description: "Informacion basica",
        icon: IdCard,
      },
      {
        key: "security",
        label: "Seguridad",
        description: "Accesos y cuentas",
        icon: Shield,
      },
      {
        key: "twofa",
        label: "2FA",
        description: "Autenticacion avanzada",
        icon: Fingerprint,
      },
      {
        key: "sessions",
        label: "Sesiones",
        description: "Dispositivos activos",
        icon: Monitor,
      },
      {
        key: "notifications",
        label: "Notificaciones",
        description: "Preferencias",
        icon: Bell,
      },
      {
        key: "plan",
        label: "Plan y tier",
        description: "Beneficios actuales",
        icon: Crown,
      },
      {
        key: "preferences",
        label: "Preferencias",
        description: "Tema e idioma",
        icon: Palette,
      },
      {
        key: "danger",
        label: "Cuenta",
        description: "Acciones criticas",
        icon: AlertTriangle,
      },
    ],
    []
  );

  const sections = useMemo(
    () => ({
      overview: ProfileOverview,
      personal: PersonalData,
      security: Security,
      twofa: TwoFA,
      sessions: Sessions,
      notifications: Notifications,
      plan: Plan,
      preferences: Preferences,
      danger: DangerZone,
    }),
    []
  );

  return (
    <div className="px-4 py-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        <div>
          <h1 className="text-lg font-semibold text-[#2F1A55]">
            Perfil de cliente
          </h1>
          <p className="text-xs text-slate-500">
            Gestiona tu informacion personal y de seguridad.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <ProfileTabs tabs={tabs} active={profileTab} onChange={setProfileTab} />
          <ProfilePanel
            activeTab={profileTab}
            sections={sections}
            usuario={usuario}
            setUser={setUser}
          />
        </div>
      </div>
    </div>
  );
}
