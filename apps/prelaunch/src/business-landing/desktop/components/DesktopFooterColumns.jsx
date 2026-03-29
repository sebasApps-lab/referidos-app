import { Link } from "react-router-dom";
import { footerColumns } from "../desktopWaitlistLandingContent";

export default function DesktopFooterColumns() {
  return (
    <div className="business-landing__footerColumns">
      {footerColumns.map((column) => (
        <div key={column.title} className="business-landing__footerColumn">
          <h4>{column.title}</h4>
          <div className="business-landing__footerLinks">
            {column.links.map((link) =>
              typeof link === "string" ? (
                <span key={link}>{link}</span>
              ) : (
                <Link key={link.label} to={link.to}>
                  {link.label}
                </Link>
              ),
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

