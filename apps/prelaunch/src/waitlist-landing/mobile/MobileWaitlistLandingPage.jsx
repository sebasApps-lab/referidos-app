import { useId, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLandingLeadCapture from "../../landing-logic/useLandingLeadCapture";
import usePrelaunchPageTracking from "../../observability/usePrelaunchPageTracking";
import { ingestPrelaunchEvent } from "../../services/prelaunchSystem";
import { buildAbsoluteReferralLink } from "../../waitlist/referralLinks";
import { scrollToSection } from "../scrollToSection";
import "../../home/mobileWaitlistLanding.css";
import "./MobileLandingModals.css";
import useMobileWaitlistLandingLayout from "./useMobileWaitlistLandingLayout";
import MobileBottomBackground from "./components/MobileBottomBackground";
import MobileBusinessInterestModal from "./components/MobileBusinessInterestModal";
import MobileCongratsModal from "./components/MobileCongratsModal";
import MobileInvitationModal from "./components/MobileInvitationModal";
import MobilePlatformModal from "./components/MobilePlatformModal";
import MobileWhoWeAreModal from "./components/MobileWhoWeAreModal";
import MobileContactSection from "./sections/MobileContactSection";
import MobileFooterSection from "./sections/MobileFooterSection";
import MobileHeroSection from "./sections/MobileHeroSection";
import MobileWaitlistSection from "./sections/MobileWaitlistSection";
import MobileWaitlistStepsSection from "./sections/MobileWaitlistStepsSection";

export default function MobileWaitlistLandingPage() {
  const [activeModal, setActiveModal] = useState(null);
  const [businessModalSurface, setBusinessModalSurface] = useState(null);
  const [congratsReferralLink, setCongratsReferralLink] = useState("");
  const navigate = useNavigate();
  const heroClipId = useId().replace(/:/g, "");
  const heroFilterId = useId().replace(/:/g, "");
  const phoneGlowFilterId = useId().replace(/:/g, "");
  const bottomClipId = useId().replace(/:/g, "");
  const { phoneScale, isTabletHeroLayout, stepCardScale } = useMobileWaitlistLandingLayout();

  const trackedSections = useMemo(
    () => [
      {
        id: "hero",
        selector: ".mobile-landing__top-section",
        order: 1,
        surface: "hero",
        reveal: true,
      },
      {
        id: "waitlist_steps",
        selector: "#waitlist-steps",
        order: 2,
        surface: "waitlist_steps",
        reveal: true,
        threshold: 0.12,
      },
      {
        id: "waitlist_form",
        selector: "#waitlist-bottom",
        order: 3,
        surface: "waitlist_form",
        reveal: true,
        threshold: 0.18,
      },
      {
        id: "contact_block",
        selector: ".mobile-landing__contact-section",
        order: 4,
        surface: "contact_block",
        reveal: true,
        threshold: 0.18,
      },
      {
        id: "footer",
        selector: ".mobile-landing__footer",
        order: 5,
        surface: "footer",
        reveal: true,
      },
    ],
    [],
  );

  const { trackLinkClick, trackModalClose, trackModalView } = usePrelaunchPageTracking({
    path: "/",
    page: "waitlist_landing",
    tree: "mobile",
    route: "/",
    sections: trackedSections,
  });

  const waitlistCapture = useLandingLeadCapture({
    role: "cliente",
    source: "landing_waitlist_mobile",
    consentVersion: "consumer_waitlist_v1",
    path: "/",
    surface: "waitlist_form",
    tree: "mobile",
    page: "waitlist_landing",
  });

  function handleScrollToWaitlist(surface = "hero_cta") {
    void ingestPrelaunchEvent("cta_waitlist_open", {
      path: "/",
      props: {
        page: "waitlist_landing",
        tree: "mobile",
        surface,
        target: "waitlist-invitation-form",
      },
    });
    scrollToSection("waitlist-invitation-form");
  }

  function handleHowItWorksClick() {
    void trackLinkClick({
      linkId: "hero_how_it_works",
      targetPath: "#waitlist-steps",
      targetKind: "section",
      surface: "hero_secondary_cta",
      label: "¿Cómo funciona?",
    });
  }

  function openBusinessModal(surface = "unknown") {
    setBusinessModalSurface(surface);
    setActiveModal("business-interest");
    void ingestPrelaunchEvent("cta_business_interest_open", {
      path: "/",
      props: {
        page: "waitlist_landing",
        tree: "mobile",
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
        tree: "mobile",
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

  function openInvitationModal() {
    setActiveModal("invitation");
    void trackModalView({
      modalId: "invitation",
      surface: "drawer_nav",
    });
  }

  function closeInvitationModal(reason = "dismiss") {
    void trackModalClose({
      modalId: "invitation",
      surface: "drawer_nav",
      reason,
    });
    setActiveModal(null);
  }

  function openPlatformModal() {
    setActiveModal("platform");
    void trackModalView({
      modalId: "platform",
      surface: "footer_panel",
    });
  }

  function closePlatformModal(reason = "dismiss") {
    void trackModalClose({
      modalId: "platform",
      surface: "footer_panel",
      reason,
    });
    setActiveModal(null);
  }

  function openTeamModal() {
    setActiveModal("team");
    void trackModalView({
      modalId: "team",
      surface: "footer_panel",
    });
  }

  function closeTeamModal(reason = "dismiss") {
    void trackModalClose({
      modalId: "team",
      surface: "footer_panel",
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

  function handleInvitationPrimaryAction() {
    closeInvitationModal("primary_action");
    handleScrollToWaitlist("invitation_modal");
  }

  function handleFeedbackOpen(prefill = {}) {
    void ingestPrelaunchEvent("feedback_open", {
      path: "/",
      props: {
        page: "waitlist_landing",
        tree: "mobile",
        surface: prefill.sourceSurface || "contact_block",
      },
    });
    navigate("/feedback?origin=cliente", {
      state: {
        name: String(prefill.name || ""),
        email: String(prefill.email || ""),
        message: String(prefill.message || ""),
        sourceSurface: String(prefill.sourceSurface || "contact_block"),
      },
    });
  }

  function handleHelpOpen(surface = "contact_block_help_link") {
    void ingestPrelaunchEvent("cta_help_open", {
      path: "/",
      props: {
        page: "waitlist_landing",
        tree: "mobile",
        surface,
      },
    });
    if (surface === "drawer_nav") {
      void trackLinkClick({
        linkId: "drawer_help",
        targetPath: "/ayuda/es",
        targetKind: "internal",
        surface,
        label: "Ayuda",
      });
    }
    navigate("/ayuda/es");
  }

  function handleLandingLinkClick(payload) {
    void trackLinkClick(payload);
  }

  function handleCopyReferralLink() {
    void ingestPrelaunchEvent("waitlist_referral_link_copy", {
      path: "/",
      props: {
        page: "waitlist_landing",
        tree: "mobile",
        surface: "congrats_modal",
      },
    });
  }

  function handleShareReferralLink(channel, targetUrl) {
    void trackLinkClick({
      linkId: `share_${channel}`,
      targetPath: targetUrl,
      targetKind: "share",
      surface: "congrats_modal",
      label: channel,
    });
  }

  return (
    <main
      className="mobile-landing"
      aria-label="Mobile waitlist landing"
      style={{
        "--mobile-phone-scale": phoneScale.toFixed(4),
        "--mobile-step-card-scale": stepCardScale.toFixed(4),
      }}
    >
      <section className="mobile-landing__top-page">
        <MobileHeroSection
          heroClipId={heroClipId}
          heroFilterId={heroFilterId}
          isTabletHeroLayout={isTabletHeroLayout}
          phoneGlowFilterId={phoneGlowFilterId}
          onBusinessClick={() => openBusinessModal("drawer")}
          onHelpClick={() => handleHelpOpen("drawer_nav")}
          onHowItWorksClick={handleHowItWorksClick}
          onInvitationClick={openInvitationModal}
          onWaitlistClick={() => handleScrollToWaitlist("hero_cta")}
        />
        <MobileWaitlistStepsSection
          isTabletHeroLayout={isTabletHeroLayout}
          phoneGlowFilterId={phoneGlowFilterId}
        />
      </section>

      <section className="mobile-landing__features-contact">
        <MobileBottomBackground bottomClipId={bottomClipId} />

        <div className="mobile-landing__features-contact-inner">
          <MobileWaitlistSection
            email={waitlistCapture.email}
            honeypot={waitlistCapture.honeypot}
            status={waitlistCapture.status}
            errorMessage={waitlistCapture.errorMessage}
            onEmailChange={waitlistCapture.setEmail}
            onHoneypotChange={waitlistCapture.setHoneypot}
            onSubmit={handleWaitlistSubmit}
          />
          <MobileContactSection
            onFeedbackClick={handleFeedbackOpen}
            onHelpClick={() => handleHelpOpen("contact_block_help_link")}
            onLinkClick={handleLandingLinkClick}
          />
        </div>

        <MobileFooterSection
          onBusinessClick={() => openBusinessModal("footer_panel")}
          onLinkClick={handleLandingLinkClick}
          onPlatformClick={openPlatformModal}
          onWhoWeAreClick={openTeamModal}
        />
      </section>

      <MobileBusinessInterestModal
        isOpen={activeModal === "business-interest"}
        onClose={(reason) => closeBusinessModal(reason)}
      />
      <MobileInvitationModal
        isOpen={activeModal === "invitation"}
        onClose={() => closeInvitationModal()}
        onPrimaryAction={handleInvitationPrimaryAction}
      />
      <MobilePlatformModal
        isOpen={activeModal === "platform"}
        onClose={() => closePlatformModal()}
      />
      <MobileWhoWeAreModal
        isOpen={activeModal === "team"}
        onClose={() => closeTeamModal()}
      />
      <MobileCongratsModal
        isOpen={activeModal === "congrats"}
        onClose={handleCloseCongrats}
        onCopyLink={handleCopyReferralLink}
        onShareLink={handleShareReferralLink}
        referralLink={congratsReferralLink}
      />
    </main>
  );
}
