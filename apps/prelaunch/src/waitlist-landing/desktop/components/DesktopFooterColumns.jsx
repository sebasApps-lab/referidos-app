import { footerColumns } from "../desktopWaitlistLandingContent";

export default function DesktopFooterColumns() {
  return (
    <div className="figma-prototype__footerColumns">
      {footerColumns.map((column) => (
        <div key={column.title} className="figma-prototype__footerColumn">
          <h4>{column.title}</h4>
          <div className="figma-prototype__footerLinks">
            {column.links.map((link) => (
              <span key={link}>{link}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
