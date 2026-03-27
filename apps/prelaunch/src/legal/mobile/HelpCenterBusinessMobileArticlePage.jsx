import { useMemo } from "react";
import { Navigate, useParams } from "react-router-dom";
import { LEGAL_ARTICLES } from "../helpCenterArticles";
import LegalContent from "../blocks/LegalContent";
import MobileBusinessHelpCenterLayout from "./MobileBusinessHelpCenterLayout";

export default function HelpCenterBusinessMobileArticlePage() {
  const { doc = "terminos" } = useParams();
  const basePath = "/ayuda-negocios/es";
  const article = useMemo(() => LEGAL_ARTICLES[doc] || null, [doc]);

  if (!article) {
    return <Navigate to={basePath} replace />;
  }

  return (
    <MobileBusinessHelpCenterLayout
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
