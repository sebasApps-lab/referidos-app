import { useEffect, useMemo, useState } from "react";
import useLandingLeadCapture from "../../landing-logic/useLandingLeadCapture";
import usePrelaunchPageTracking from "../../observability/usePrelaunchPageTracking";
import { ingestPrelaunchEvent } from "../../services/prelaunchSystem";
import { buildAbsoluteReferralLink } from "../../waitlist/referralLinks";
import { scrollToSection } from "../scrollToSection";
import "./desktopWaitlistLanding.css";
import "./desktopLandingModals.css";
import DesktopBusinessInterestModal from "./components/DesktopBusinessInterestModal";
import DesktopCongratsModal from "./components/DesktopCongratsModal";
import DesktopNavigationHeader from "./components/DesktopNavigationHeader";
import DesktopPlatformModal from "./components/DesktopPlatformModal";
import DesktopWhoWeAreModal from "./components/DesktopWhoWeAreModal";
import DesktopFooterSection from "./sections/DesktopFooterSection";
import DesktopHeroSection from "./sections/DesktopHeroSection";
import DesktopWaitlistSection from "./sections/DesktopWaitlistSection";
import DesktopWaitlistStepsSection from "./sections/DesktopWaitlistStepsSection";

function getFooterColumnsScale() {
  if (typeof window === "undefined") {
    return 1;
  }

  if (window.innerWidth >= 850) {
    return 1;
  }

  if (window.innerWidth <= 700) {
    return 0.72;
  }

  return 0.72 + ((window.innerWidth - 700) / 150) * 0.28;
}

export default function DesktopWaitlistLandingPage() {
  const [footerColumnsScale, setFooterColumnsScale] = useState(() =>
    getFooterColumnsScale(),
  );
  const [activeModal, setActiveModal] = useState(null);
  const [businessModalSurface, setBusinessModalSurface] = useState(null);
  const [congratsReferralLink, setCongratsReferralLink] = useState("");

  const trackedSections = useMemo(
    () => [
      {
        id: "hero",
        selector: ".figma-prototype__hero-band",
        order: 1,
        surface: "hero",
      },
      {
        id: "waitlist_steps",
        selector: "#waitlist-steps",
        order: 2,
        surface: "waitlist_steps",
        reveal: true,
      },
      {
        id: "waitlist_form",
        selector: "#waitlist-bottom",
        order: 3,
        surface: "waitlist_form",
        reveal: true,
      },
      {
        id: "footer",
        selector: ".figma-prototype__footerSection",
        order: 4,
        surface: "footer",
        reveal: true,
      },
    ],
    [],
  );

  const { trackEvent, trackLinkClick, trackModalClose, trackModalView } =
    usePrelaunchPageTracking({
      path: "/",
      page: "waitlist_landing",
      tree: "desktop",
      route: "/",
      sections: trackedSections,
    });

  const waitlistCapture = useLandingLeadCapture({
    role: "cliente",
    source: "landing_waitlist",
    consentVersion: "consumer_waitlist_v1",
    path: "/",
    surface: "waitlist_form",
    tree: "desktop",
    page: "waitlist_landing",
  });

  useEffect(() => {
    function handleResize() {
      setFooterColumnsScale(getFooterColumnsScale());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleScrollToWaitlist(surface = "hero_cta") {
    void ingestPrelaunchEvent("cta_waitlist_open", {
      path: "/",
      props: {
        page: "waitlist_landing",
        tree: "desktop",
        surface,
        target: "waitlist-bottom",
      },
    });
    scrollToSection("waitlist-bottom");
  }

  function handleDesktopHeaderLink(link) {
    if (link.to === "/ayuda/es") {
      void trackEvent("cta_help_open", {
        surface: "header_nav",
      });
      void trackLinkClick({
        linkId: "nav_help",
        targetPath: link.to,
        targetKind: "internal",
        surface: "header_nav",
        label: link.label,
      });
      return;
    }

    if (link.targetId === "waitlist-bottom") {
      void trackLinkClick({
        linkId: "nav_how_it_works",
        targetPath: "#waitlist-bottom",
        targetKind: "section",
        surface: "header_nav",
        label: link.label,
      });
    }
  }

  function handleDesktopFooterLink(link, column) {
    const targetPath = link.to || "";
    const surface = column?.title === "CONTACTO" ? "footer_contact" : "footer_legal";
    const linkIds = {
      "/ayuda/es/articulo/privacidad": "footer_privacy",
      "/ayuda/es/articulo/terminos": "footer_terms",
      "/ayuda/es/articulo/borrar-datos": "footer_delete_data",
      "/soporte/abrir-ticket?origin=cliente&channel=whatsapp": "footer_support_whatsapp",
      "/soporte/abrir-ticket?origin=cliente&channel=email": "footer_support_email",
      "/feedback?origin=cliente": "footer_feedback",
    };

    void trackLinkClick({
      linkId: linkIds[targetPath] || `footer_${String(link.label || "link").toLowerCase()}`,
      targetPath,
      targetKind: "internal",
      surface,
      label: link.label,
    });
  }

  function openBusinessModal(surface = "unknown") {
    setBusinessModalSurface(surface);
    setActiveModal("business-interest");
    void ingestPrelaunchEvent("cta_business_interest_open", {
      path: "/",
      props: {
        page: "waitlist_landing",
        tree: "desktop",
        surface,
      },
    });
    void trackModalView({
      modalId: "business_interest",
      surface,
    });
  }

  function closeBusinessModal(reason = "dismiss") {
    void ingestPrelaunchEvent("cta_business_interest_close", {
      path: "/",
      props: {
        page: "waitlist_landing",
        tree: "desktop",
        surface: businessModalSurface || "unknown",
        reason,
      },
    });
    void trackModalClose({
      modalId: "business_interest",
      surface: businessModalSurface || "unknown",
      reason,
    });
    setActiveModal(null);
    setBusinessModalSurface(null);
  }

  function openPlatformModal() {
    setActiveModal("platform");
    void trackModalView({
      modalId: "platform",
      surface: "footer_information",
    });
  }

  function closePlatformModal(reason = "dismiss") {
    void trackModalClose({
      modalId: "platform",
      surface: "footer_information",
      reason,
    });
    setActiveModal(null);
  }

  function openTeamModal() {
    setActiveModal("team");
    void trackModalView({
      modalId: "team",
      surface: "footer_information",
    });
  }

  function closeTeamModal(reason = "dismiss") {
    void trackModalClose({
      modalId: "team",
      surface: "footer_information",
      reason,
    });
    setActiveModal(null);
  }

  async function handleWaitlistSubmit(event) {
    event.preventDefault();
    const result = await waitlistCapture.submit();
    if (!result.ok) {
      return;
    }

    setCongratsReferralLink(
      buildAbsoluteReferralLink(result.data?.referral_link_path, "/"),
    );
    waitlistCapture.clear();
    setActiveModal("congrats");
    void trackModalView({
      modalId: "congrats",
      surface: "waitlist_form_success",
    });
  }

  function handleCloseCongrats() {
    void trackModalClose({
      modalId: "congrats",
      surface: "waitlist_form_success",
      reason: "dismiss",
    });
    setActiveModal(null);
    setCongratsReferralLink("");
    waitlistCapture.clear();
  }

  function handleCopyReferralLink() {
    void ingestPrelaunchEvent("waitlist_referral_link_copy", {
      path: "/",
      props: {
        page: "waitlist_landing",
        tree: "desktop",
        surface: "congrats_modal",
      },
    });
  }

  return (
    <main
      className="figma-prototype"
      aria-label="Figma prototype v2"
      style={{ "--figma-footer-columns-scale": footerColumnsScale }}
    >
      <div className="figma-prototype__shell">
        <section className="figma-prototype__hero-band">
          <DesktopNavigationHeader
            onBusinessClick={() => openBusinessModal("header_nav")}
            onLinkClick={handleDesktopHeaderLink}
          />
          <DesktopHeroSection onWaitlistClick={() => handleScrollToWaitlist("hero_cta")} />
        </section>
        <DesktopWaitlistStepsSection />
        <section className="figma-prototype__bottom-band" id="waitlist-bottom">
          <DesktopWaitlistSection
            email={waitlistCapture.email}
            honeypot={waitlistCapture.honeypot}
            status={waitlistCapture.status}
            errorMessage={waitlistCapture.errorMessage}
            onEmailChange={waitlistCapture.setEmail}
            onHoneypotChange={waitlistCapture.setHoneypot}
            onSubmit={handleWaitlistSubmit}
          />
          <DesktopFooterSection
            onPlatformClick={openPlatformModal}
            onWhoWeAreClick={openTeamModal}
            onLinkClick={handleDesktopFooterLink}
          />
        </section>
      </div>

      <DesktopBusinessInterestModal
        isOpen={activeModal === "business-interest"}
        onClose={(reason) => closeBusinessModal(reason)}
      />
      <DesktopPlatformModal
        isOpen={activeModal === "platform"}
        onClose={() => closePlatformModal()}
      />
      <DesktopWhoWeAreModal
        isOpen={activeModal === "team"}
        onClose={() => closeTeamModal()}
      />
      <DesktopCongratsModal
        isOpen={activeModal === "congrats"}
        onClose={handleCloseCongrats}
        onCopyLink={handleCopyReferralLink}
        referralLink={congratsReferralLink}
      />
    </main>
  );
}
