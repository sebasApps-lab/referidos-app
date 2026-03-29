export function scrollToSection(sectionId) {
  if (typeof document === "undefined") {
    return;
  }

  const section = document.getElementById(sectionId);
  if (!section) {
    return;
  }

  section.scrollIntoView({ behavior: "smooth", block: "start" });
}
