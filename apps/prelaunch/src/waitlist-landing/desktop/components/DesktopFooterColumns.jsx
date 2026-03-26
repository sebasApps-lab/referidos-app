import { Link } from "react-router-dom";
import { footerColumns } from "../desktopWaitlistLandingContent";

export default function DesktopFooterColumns({ onPlatformClick, onWhoWeAreClick }) {
  function handleFooterAction(actionId) {
    if (actionId === "platform-modal") {
      onPlatformClick?.();
    }

    if (actionId === "who-we-are-modal") {
      onWhoWeAreClick?.();
    }
  }

  return (
    <div className="figma-prototype__footerColumns">
      {footerColumns.map((column) => (
        <div key={column.title} className="figma-prototype__footerColumn">
          <h4>{column.title}</h4>
          <div className="figma-prototype__footerLinks">
            {column.links.map((link) =>
              typeof link === "string" ? (
                <span key={link}>{link}</span>
              ) : link.actionId ? (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => handleFooterAction(link.actionId)}
                >
                  {link.label}
                </button>
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
