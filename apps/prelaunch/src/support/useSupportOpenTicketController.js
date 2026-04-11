import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ingestPrelaunchEvent } from "../services/prelaunchSystem";
import { createAnonymousSupportThread } from "./supportApi";
import {
  DEFAULT_SUPPORT_CATEGORIES,
  ECUADOR_PREFIX,
  buildSupportSuccessMessage,
  isOtherSupportCategory,
  normalizeSupportEmail,
  normalizeSupportWhatsappLocal,
} from "./supportOpenTicketShared";

function normalizeOriginRole(value) {
  const normalized = String(value || "").trim().toLowerCase();
  if (normalized === "negocio" || normalized === "business") return "negocio";
  return "cliente";
}

export function useSupportOpenTicketController() {
  const [searchParams] = useSearchParams();
  const origin = normalizeOriginRole(searchParams.get("origin"));
  const initialChannel = searchParams.get("channel") === "whatsapp" ? "whatsapp" : "email";
  const backTo = "/ayuda/es";

  const desktopHeaderActions = useMemo(
    () => [
      {
        key: "back",
        label: "\u2197 Centro de Ayuda",
        to: backTo,
        className:
          "help-center__header-link help-center__header-link--ghost support-open-ticket__header-link-back",
      },
    ],
    [backTo],
  );

  const mobileHeaderActions = useMemo(
    () => [
      {
        key: "back",
        label: "\u2197 Centro de Ayuda",
        to: backTo,
        variant: "ghost",
      },
    ],
    [backTo],
  );

  const mobileDrawerItems = useMemo(
    () => [
      {
        key: "back",
        title: "Centro de Ayuda",
        to: backTo,
      },
    ],
    [backTo],
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [preferredChannel, setPreferredChannel] = useState(initialChannel);
  const [categoryOptions, setCategoryOptions] = useState(DEFAULT_SUPPORT_CATEGORIES);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const normalizedEmail = useMemo(() => normalizeSupportEmail(email), [email]);
  const normalizedWhatsappLocal = useMemo(
    () => normalizeSupportWhatsappLocal(phone),
    [phone],
  );
  const normalizedWhatsapp = useMemo(
    () => (normalizedWhatsappLocal ? `${ECUADOR_PREFIX}${normalizedWhatsappLocal}` : null),
    [normalizedWhatsappLocal],
  );

  const selectedContact = preferredChannel === "email" ? normalizedEmail : normalizedWhatsapp;
  const selectedCategory = useMemo(
    () => categoryOptions.find((item) => item.id === category) || null,
    [category, categoryOptions],
  );
  const isOtherCategorySelected = useMemo(
    () => isOtherSupportCategory(selectedCategory?.id),
    [selectedCategory],
  );
  const trimmedDescription = useMemo(() => description.trim(), [description]);

  const canSubmit = Boolean(
    name.trim() &&
      normalizedEmail &&
      normalizedWhatsapp &&
      selectedCategory &&
      !submitting &&
      !categoriesLoading,
  );

  useEffect(() => {
    void ingestPrelaunchEvent("page_view", {
      path: "/soporte/abrir-ticket",
      props: {
        page: "support_open_ticket",
        origin,
      },
    });
  }, [origin]);

  useEffect(() => {
    setCategoryOptions(DEFAULT_SUPPORT_CATEGORIES);
    setCategoriesLoading(false);
  }, [preferredChannel]);

  useEffect(() => {
    setCategory((current) => {
      if (current && categoryOptions.some((item) => item.id === current)) {
        return current;
      }
      return categoryOptions[0]?.id || "";
    });
  }, [categoryOptions]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!canSubmit) {
      setError("Completa todos los campos con informaci\u00f3n v\u00e1lida para continuar.");
      setSuccess("");
      return;
    }

    setSubmitting(true);
    setError("");
    setSuccess("");

    const payload = {
      channel: preferredChannel,
      contact: selectedContact,
      summary:
        trimmedDescription || "Solicitud enviada desde el formulario web de soporte.",
      category: selectedCategory.id,
      severity: "s2",
      origin_source: "user",
      app_channel: "prelaunch",
      source_route: "/soporte/abrir-ticket",
      client_request_id: crypto.randomUUID(),
      context: {
        flow: "support_form",
        name: name.trim(),
        email: normalizedEmail,
        whatsapp: normalizedWhatsapp,
        preferred_channel: preferredChannel,
        category_label: selectedCategory.label,
        help_center_origin: origin,
        description: trimmedDescription || null,
      },
    };

    const response = await createAnonymousSupportThread(payload);

    if (!response.ok || !response.data?.ok) {
      if (response.error === "missing_env") {
        setSuccess(buildSupportSuccessMessage(preferredChannel));
        setSubmitting(false);
        return;
      }

      setError(
        response.error ||
          response.data?.detail ||
          response.data?.error ||
          "No se pudo enviar tu solicitud en este momento.",
      );
      setSubmitting(false);
      return;
    }

    void ingestPrelaunchEvent("support_ticket_created", {
      path: "/soporte/abrir-ticket",
      props: {
        channel: preferredChannel,
        category: selectedCategory.id,
        origin,
      },
    });

    setSuccess(buildSupportSuccessMessage(preferredChannel));
    setSubmitting(false);
  }

  return {
    origin,
    backTo,
    desktopHeaderActions,
    mobileHeaderActions,
    mobileDrawerItems,
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    category,
    setCategory,
    description,
    setDescription,
    isOtherCategorySelected,
    preferredChannel,
    setPreferredChannel,
    categoryOptions,
    categoriesLoading,
    submitting,
    error,
    success,
    canSubmit,
    handleSubmit,
  };
}
