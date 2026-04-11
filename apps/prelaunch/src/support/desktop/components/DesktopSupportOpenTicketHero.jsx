import { Link } from "react-router-dom";

export default function DesktopSupportOpenTicketHero() {
  return (
    <section className="support-open-ticket__hero">
      <h1>{"\u00bfNecesitas ayuda?"}</h1>
      <p>Completa el formulario y nos pondremos en contacto contigo.</p>
      <p>
        Si lo que deseas es dejar un mensaje, sigue el{" "}
        <Link to="/feedback">enlace</Link>
      </p>
    </section>
  );
}
