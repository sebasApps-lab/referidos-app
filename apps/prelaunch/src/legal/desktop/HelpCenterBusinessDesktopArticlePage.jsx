import { useMemo } from "react";
import { Navigate, useParams } from "react-router-dom";
import { LEGAL_ARTICLES } from "../helpCenterArticles";
import { buildSidebarCategories, HelpCenterLayout } from "../helpCenterShared";
import LegalContent from "../blocks/LegalContent";

export default function HelpCenterBusinessDesktopArticlePage() {
  const { doc = "terminos" } = useParams();
  const basePath = "/ayuda-negocios/es";
  const article = useMemo(() => LEGAL_ARTICLES[doc] || null, [doc]);

  if (!article) {
    return <Navigate to={basePath} replace />;
  }

  return (
    <HelpCenterLayout
      basePath={basePath}
      headerTitle="Centro de Ayuda de Negocios o Empresas"
      theme="business"
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
