import { useMemo } from "react";
import { Navigate, useParams } from "react-router-dom";
import { LEGAL_ARTICLES } from "../helpCenterArticles";
import { buildSidebarCategories } from "../helpCenterShared";
import LegalContent from "../blocks/LegalContent";
import { businessMobileHeaderActions } from "./helpCenterMobileConfig";
import { HelpCenterMobileLayout } from "./helpCenterMobileShared";

export default function HelpCenterBusinessMobileArticlePage() {
  const { doc = "terminos" } = useParams();
  const basePath = "/ayuda-negocios/es";
  const article = useMemo(() => LEGAL_ARTICLES[doc] || null, [doc]);

  if (!article) {
    return <Navigate to={basePath} replace />;
  }

  return (
    <HelpCenterMobileLayout
      basePath={basePath}
      headerTitle="Centro de Ayuda para Negocios"
      theme="business"
      headerActions={businessMobileHeaderActions}
      ctaProps={{ emailLabel: "Email" }}
      sidebarItems={buildSidebarCategories(basePath)}
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
