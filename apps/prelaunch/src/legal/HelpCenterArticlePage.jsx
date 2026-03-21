import { useMemo } from "react";
import { Navigate, useParams } from "react-router-dom";
import LegalContent from "./blocks/LegalContent";
import { getLegalMarkdown } from "@referidos/legal-content";
import { HelpCenterLayout, sidebarCategories } from "./helpCenterShared";

const LEGAL_ARTICLES = {
  privacidad: {
    title: "Pol\u00edtica de Privacidad",
    subtitle: "Lee c\u00f3mo protegemos tu privacidad y tratamos tus datos en Referidos App.",
    eyebrow: "Informaci\u00f3n legal",
    markdown: getLegalMarkdown("privacy", "es"),
  },
  terminos: {
    title: "T\u00e9rminos y Condiciones",
    subtitle: "Consulta las condiciones de uso de la plataforma y nuestras reglas generales.",
    eyebrow: "Informaci\u00f3n legal",
    markdown: getLegalMarkdown("terms", "es"),
  },
  "borrar-datos": {
    title: "Borrar mis datos",
    subtitle: "Revisa c\u00f3mo solicitar la eliminaci\u00f3n de tu informaci\u00f3n personal.",
    eyebrow: "Informaci\u00f3n legal",
    markdown: getLegalMarkdown("data-deletion", "es"),
  },
};

export default function HelpCenterArticlePage() {
  const { doc = "terminos" } = useParams();
  const article = useMemo(() => LEGAL_ARTICLES[doc] || null, [doc]);

  if (!article) {
    return <Navigate to="/ayuda/es" replace />;
  }

  return (
    <HelpCenterLayout
      sidebarItems={sidebarCategories}
      content={
        <article className="help-center__article-panel">
          <div className="help-center__article-content">
            <LegalContent markdown={article.markdown} />
          </div>
        </article>
      }
    />
  );
}
