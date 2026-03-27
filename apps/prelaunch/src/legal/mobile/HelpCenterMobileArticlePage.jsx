import { useMemo } from "react";
import { Navigate, useParams } from "react-router-dom";
import { LEGAL_ARTICLES } from "../helpCenterArticles";
import LegalContent from "../blocks/LegalContent";
import MobileConsumerHelpCenterLayout from "./MobileConsumerHelpCenterLayout";

export default function HelpCenterMobileArticlePage() {
  const { doc = "terminos" } = useParams();
  const basePath = "/ayuda/es";
  const article = useMemo(() => LEGAL_ARTICLES[doc] || null, [doc]);

  if (!article) {
    return <Navigate to={basePath} replace />;
  }

  return (
    <MobileConsumerHelpCenterLayout
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
