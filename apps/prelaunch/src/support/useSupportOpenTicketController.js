import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ingestPrelaunchEvent } from "../services/prelaunchSystem";
import { createAnonymousSupportThread, listAnonymousSupportCategories } from "./supportApi";
import {
  DEFAULT_SUPPORT_CATEGORIES,
  ECUADOR_PREFIX,
  buildSupportSuccessMessage,
  normalizeSupportCategoryOption,
  normalizeSupportEmail,
  normalizeSupportWhatsappLocal,
} from "./supportOpenTicketShared";

export function useSupportOpenTicketController() {
  const [searchParams] = useSearchParams();
  const origin = searchParams.get("origin") === "business" ? "business" : "consumer";
  const initialChannel = searchParams.get("channel") === "whatsapp" ? "whatsapp" : "email";
  const backTo = origin === "business" ? "/ayuda-negocios/es" : "/ayuda/es";

  const desktopHeaderActions = useMemo(
    () => [
      {
        key: "back",
        label: "\u2197 Volver al Centro de Ayuda",
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
        label: "\u2197 Volver al Centro de Ayuda",
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
        title: "Volver al Centro de Ayuda",
        to: backTo,
      },
    ],
    [backTo],
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
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
    let cancelled = false;

    async function loadCategories() {
      setCategoriesLoading(true);
      const response = await listAnonymousSupportCategories({
        requested_channel: preferredChannel,
      });

      if (cancelled) {
        return;
      }

      if (!response.ok || !response.data?.ok) {
        setCategoryOptions(DEFAULT_SUPPORT_CATEGORIES);
        setCategoriesLoading(false);
        return;
      }

      const nextOptions = (response.data.categories || [])
        .map((item) => normalizeSupportCategoryOption(item))
        .filter(Boolean);

      setCategoryOptions(nextOptions.length ? nextOptions : DEFAULT_SUPPORT_CATEGORIES);
      setCategoriesLoading(false);
    }

    void loadCategories();

    return () => {
      cancelled = true;
    };
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
      summary: "Solicitud enviada desde el formulario web de soporte.",
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
