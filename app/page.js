export default function TGRFumigaciones() {

  const servicios = [
    { icon: "🪳", num: "01", titulo: "Control de Cucarachas", desc: "Tratamientos con gel y aspersión profunda para eliminar infestaciones rápidamente en cualquier área." },
    { icon: "🐀", num: "02", titulo: "Control de Roedores", desc: "Sistemas de control físico y químico certificados para proteger tu espacio sin riesgos para tu familia." },
    { icon: "🐜", num: "03", titulo: "Control de Termitas", desc: "Diagnóstico estructural y tratamiento preventivo o correctivo de alta precisión." },
    { icon: "🦟", num: "04", titulo: "Control de Mosquitos", desc: "Nebulización y tratamientos larvicidas para reducir vectores de enfermedades." },
    { icon: "🏢", num: "05", titulo: "Servicios Comerciales", desc: "Planes de manejo integrado para empresas, restaurantes, hoteles, clínicas y oficinas con bitácoras y reportes." },
    { icon: "🏠", num: "06", titulo: "Servicios Residenciales", desc: "Atención rápida y discreta con protocolos seguros adaptados a familias y mascotas." },
  ];

  const stats = [
    { valor: "10+", label: "Años de experiencia" },
    { valor: "2,400+", label: "Clientes atendidos" },
    { valor: "98%", label: "Satisfacción garantizada" },
    { valor: "24h", label: "Tiempo de respuesta" },
  ];

  const clientes = [
    { icon: "🏠", titulo: "Casa Habitación", desc: "Control de insectos rastreros y voladores, eliminación de roedores. Aplicación segura para familia y mascotas." },
    { icon: "🏘️", titulo: "Residenciales", desc: "Manejo integrado de plagas en áreas comunes, jardines, albercas y estacionamientos." },
    { icon: "🍽️", titulo: "Negocios y Oficinas", desc: "Ambientes libres de plagas sin interrumpir operaciones. Planes mensuales, bimestrales o trimestrales." },
    { icon: "🏥", titulo: "Establecimientos Regulados", desc: "Cumplimiento normativo para industria alimentaria, hoteles, clínicas y laboratorios. Productos grado alimenticio." },
  ];

  return (
    <div style={{ fontFamily: "'Segoe UI', Arial, sans-serif", background: "#0d1a10", color: "#f0f0ec", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        :root {
          --verde: #1a4d2e;
          --verde-oscuro: #122d1c;
          --verde-lima: #5cb85c;
          --verde-lima-bright: #76d576;
          --vino: #7a1c1c;
          --crema: #f0f0ec;
          --gris: #b0b8b0;
          --negro: #0d1a10;
          --negro2: #111f14;
          --negro3: #182a1c;
        }

        body { background: var(--negro); }

        /* NAV */
        .nav {
          position: fixed; top: 0; left: 0; width: 100%; z-index: 100;
          background: rgba(13,26,16,0.97);
          border-bottom: 1px solid rgba(92,184,92,0.15);
          backdrop-filter: blur(12px);
          transition: all 0.3s;
        }
        .nav-inner {
          max-width: 1280px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 32px; height: 70px;
        }
        .nav-logo {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 26px; font-weight: 900;
          color: var(--crema); text-decoration: none;
          letter-spacing: 0.05em;
        }
        .nav-logo span { color: var(--verde-lima); }
        .nav-links { display: flex; gap: 36px; list-style: none; }
        .nav-links a {
          font-family: 'Barlow', sans-serif;
          font-size: 13px; font-weight: 500;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--gris); text-decoration: none;
          transition: color 0.2s;
        }
        .nav-links a:hover { color: var(--verde-lima); }
        .nav-cta {
          background: var(--verde-lima); color: #0d1a10 !important;
          padding: 10px 24px; font-weight: 700 !important;
          font-size: 13px !important; letter-spacing: 0.08em !important;
          transition: background 0.2s !important;
        }
        .nav-cta:hover { background: var(--verde-lima-bright) !important; color: #0d1a10 !important; }

        /* HERO */
        .hero {
          position: relative; min-height: 100vh;
          display: flex; align-items: center;
          overflow: hidden; padding-top: 70px;
        }
        .hero-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%; object-fit: cover; object-position: center;
        }
        .hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(105deg, rgba(13,26,16,0.92) 0%, rgba(13,26,16,0.75) 50%, rgba(13,26,16,0.4) 100%);
        }
        .hero-content {
          position: relative; z-index: 2;
          max-width: 1280px; margin: 0 auto;
          padding: 80px 32px;
          display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;
        }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(92,184,92,0.12);
          border: 1px solid rgba(92,184,92,0.35);
          color: var(--verde-lima); padding: 6px 16px;
          font-family: 'Barlow', sans-serif;
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.15em; text-transform: uppercase;
          margin-bottom: 24px;
        }
        .hero-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(48px, 7vw, 82px);
          font-weight: 900; line-height: 0.95;
          color: var(--crema); text-transform: uppercase;
          letter-spacing: -0.01em;
          margin-bottom: 8px;
        }
        .hero-title .accent { color: var(--verde-lima); display: block; }
        .hero-sub {
          font-family: 'Barlow', sans-serif;
          font-size: 18px; font-weight: 300;
          color: rgba(240,240,236,0.75);
          line-height: 1.65; margin: 24px 0 40px;
          max-width: 480px;
        }
        .hero-actions { display: flex; gap: 16px; flex-wrap: wrap; }
        .btn-primary {
          display: inline-flex; align-items: center; gap: 10px;
          background: var(--verde-lima); color: #0d1a10;
          font-family: 'Barlow', sans-serif;
          font-size: 14px; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          text-decoration: none; padding: 16px 32px;
          transition: background 0.2s, transform 0.2s;
          border: none; cursor: pointer;
        }
        .btn-primary:hover { background: var(--verde-lima-bright); transform: translateY(-2px); }
        .btn-secondary {
          display: inline-flex; align-items: center; gap: 10px;
          background: transparent; color: var(--crema);
          font-family: 'Barlow', sans-serif;
          font-size: 14px; font-weight: 500;
          letter-spacing: 0.08em; text-transform: uppercase;
          text-decoration: none; padding: 15px 32px;
          border: 1px solid rgba(240,240,236,0.3);
          transition: border-color 0.2s, color 0.2s;
        }
        .btn-secondary:hover { border-color: var(--verde-lima); color: var(--verde-lima); }

        /* HERO RIGHT — CARD INFO */
        .hero-card {
          background: rgba(18,45,28,0.85);
          border: 1px solid rgba(92,184,92,0.2);
          backdrop-filter: blur(10px);
          padding: 40px;
        }
        .hero-card-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 13px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--verde-lima); margin-bottom: 28px;
        }
        .hero-card-list { list-style: none; display: flex; flex-direction: column; gap: 16px; }
        .hero-card-list li {
          display: flex; align-items: flex-start; gap: 14px;
          font-family: 'Barlow', sans-serif;
          font-size: 15px; color: rgba(240,240,236,0.85); line-height: 1.4;
        }
        .check {
          width: 22px; height: 22px; min-width: 22px;
          background: var(--verde); border: 1px solid var(--verde-lima);
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; color: var(--verde-lima); margin-top: 1px;
        }
        .cofepris-badge {
          margin-top: 28px; padding-top: 24px;
          border-top: 1px solid rgba(92,184,92,0.15);
          display: flex; align-items: center; gap: 14px;
        }
        .cofepris-icon {
          width: 44px; height: 44px; min-width: 44px;
          background: var(--vino);
          display: flex; align-items: center; justify-content: center;
          font-size: 20px;
        }
        .cofepris-text { font-family: 'Barlow', sans-serif; }
        .cofepris-text strong {
          display: block; font-size: 13px; font-weight: 700;
          color: var(--crema); letter-spacing: 0.05em;
        }
        .cofepris-text span { font-size: 12px; color: var(--gris); }

        /* STATS BAR */
        .stats-bar {
          background: var(--verde);
          border-top: 2px solid var(--verde-lima);
          border-bottom: 2px solid rgba(92,184,92,0.2);
        }
        .stats-inner {
          max-width: 1280px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(4,1fr);
          padding: 0 32px;
        }
        .stat-item {
          padding: 32px 24px; text-align: center;
          border-right: 1px solid rgba(240,240,236,0.1);
        }
        .stat-item:last-child { border-right: none; }
        .stat-value {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 42px; font-weight: 900;
          color: var(--verde-lima); line-height: 1;
        }
        .stat-label {
          font-family: 'Barlow', sans-serif;
          font-size: 12px; font-weight: 400;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: rgba(240,240,236,0.6); margin-top: 6px;
        }

        /* SECTION BASE */
        .section { padding: 100px 32px; }
        .section-inner { max-width: 1280px; margin: 0 auto; }
        .section-label {
          font-family: 'Barlow', sans-serif;
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--verde-lima); margin-bottom: 16px;
          display: flex; align-items: center; gap: 12px;
        }
        .section-label::after {
          content: ''; display: block;
          width: 40px; height: 1px; background: var(--verde-lima);
        }
        .section-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(36px, 5vw, 58px);
          font-weight: 900; text-transform: uppercase;
          line-height: 1; color: var(--crema);
        }
        .section-title .verde { color: var(--verde-lima); }
        .section-desc {
          font-family: 'Barlow', sans-serif;
          font-size: 16px; font-weight: 300;
          color: var(--gris); line-height: 1.75;
          max-width: 560px; margin-top: 20px;
        }

        /* CLIENTES — quienes somos */
        .clientes-bg { background: var(--negro2); }
        .clientes-grid {
          display: grid; grid-template-columns: repeat(4,1fr); gap: 2px;
          margin-top: 60px;
        }
        .cliente-card {
          background: var(--negro3);
          padding: 40px 32px;
          border-top: 3px solid var(--verde);
          transition: border-color 0.3s, transform 0.3s;
          cursor: default;
        }
        .cliente-card:hover { border-color: var(--verde-lima); transform: translateY(-6px); }
        .cliente-icon { font-size: 36px; margin-bottom: 20px; }
        .cliente-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 20px; font-weight: 700; text-transform: uppercase;
          color: var(--crema); margin-bottom: 12px;
        }
        .cliente-desc {
          font-family: 'Barlow', sans-serif;
          font-size: 14px; color: var(--gris); line-height: 1.7;
        }

        /* SERVICIOS */
        .servicios-bg { background: var(--negro); }
        .servicios-header {
          display: flex; justify-content: space-between; align-items: flex-end;
          margin-bottom: 60px; gap: 40px; flex-wrap: wrap;
        }
        .servicios-grid {
          display: grid; grid-template-columns: repeat(3,1fr); gap: 2px;
        }
        .servicio-card {
          background: var(--negro3);
          padding: 40px 36px;
          position: relative; overflow: hidden;
          transition: background 0.3s;
        }
        .servicio-card::before {
          content: attr(data-num);
          position: absolute; top: -10px; right: 20px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 80px; font-weight: 900;
          color: rgba(92,184,92,0.06);
          line-height: 1; pointer-events: none;
        }
        .servicio-card:hover { background: #1e3525; }
        .servicio-icon { font-size: 40px; margin-bottom: 20px; }
        .servicio-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 22px; font-weight: 800; text-transform: uppercase;
          color: var(--crema); margin-bottom: 12px;
        }
        .servicio-desc {
          font-family: 'Barlow', sans-serif;
          font-size: 14px; color: var(--gris); line-height: 1.7;
        }
        .servicio-link {
          display: inline-flex; align-items: center; gap: 8px;
          margin-top: 24px;
          font-family: 'Barlow', sans-serif;
          font-size: 12px; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--verde-lima); text-decoration: none;
          transition: gap 0.2s;
        }
        .servicio-card:hover .servicio-link { gap: 14px; }

        /* COFEPRIS BAND */
        .cofepris-band {
          background: var(--vino);
          padding: 60px 32px;
          border-top: 1px solid rgba(255,255,255,0.08);
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .cofepris-band-inner {
          max-width: 1280px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          gap: 40px; flex-wrap: wrap;
        }
        .cofepris-band-left { display: flex; align-items: center; gap: 24px; }
        .cofepris-big-icon {
          font-size: 48px; line-height: 1;
        }
        .cofepris-band-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 32px; font-weight: 900; text-transform: uppercase;
          color: var(--crema); line-height: 1.1;
        }
        .cofepris-band-title span { color: #ffcdd2; font-size: 14px; font-weight: 400; display: block; margin-top: 4px; font-family: 'Barlow', sans-serif; text-transform: none; letter-spacing: 0.02em; }
        .cofepris-items { display: flex; gap: 40px; flex-wrap: wrap; }
        .cofepris-item {
          display: flex; align-items: flex-start; gap: 12px;
        }
        .cofepris-item-icon {
          font-size: 22px; margin-top: 2px;
        }
        .cofepris-item-text {
          font-family: 'Barlow', sans-serif;
        }
        .cofepris-item-text strong {
          display: block; font-size: 14px; font-weight: 700;
          color: var(--crema);
        }
        .cofepris-item-text span {
          font-size: 12px; color: rgba(255,255,255,0.6);
        }

        /* NOSOTROS */
        .nosotros-bg { background: var(--negro2); }
        .nosotros-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 80px;
          align-items: center; margin-top: 0;
        }
        .nosotros-visual {
          background: var(--verde);
          padding: 48px;
          border-left: 4px solid var(--verde-lima);
          position: relative;
        }
        .nosotros-visual::after {
          content: ''; position: absolute;
          top: 16px; left: 16px;
          right: -8px; bottom: -8px;
          border: 1px solid rgba(92,184,92,0.2);
          z-index: -1;
        }
        .nosotros-list { list-style: none; display: flex; flex-direction: column; gap: 20px; }
        .nosotros-list li {
          display: flex; align-items: flex-start; gap: 16px;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(240,240,236,0.08);
        }
        .nosotros-list li:last-child { border-bottom: none; padding-bottom: 0; }
        .nl-icon {
          font-size: 24px; min-width: 32px;
        }
        .nl-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 16px; font-weight: 700; text-transform: uppercase;
          color: var(--verde-lima); margin-bottom: 4px;
        }
        .nl-desc {
          font-family: 'Barlow', sans-serif;
          font-size: 13px; color: rgba(240,240,236,0.6); line-height: 1.5;
        }

        /* CONTACTO */
        .contacto-bg { background: var(--negro); }
        .contacto-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 80px;
          align-items: start; margin-top: 60px;
        }
        .contacto-info { display: flex; flex-direction: column; gap: 32px; }
        .contacto-item { display: flex; align-items: flex-start; gap: 20px; }
        .contacto-item-icon {
          width: 50px; height: 50px; min-width: 50px;
          background: var(--verde);
          border: 1px solid rgba(92,184,92,0.3);
          display: flex; align-items: center; justify-content: center;
          font-size: 22px;
        }
        .contacto-item-body { font-family: 'Barlow', sans-serif; }
        .contacto-item-body strong {
          display: block; font-size: 12px; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--verde-lima); margin-bottom: 4px;
        }
        .contacto-item-body a, .contacto-item-body p {
          font-size: 16px; color: var(--crema);
          text-decoration: none; line-height: 1.5;
        }
        .contacto-item-body a:hover { color: var(--verde-lima); }
        .contacto-cta-box {
          background: var(--verde);
          border: 1px solid rgba(92,184,92,0.25);
          padding: 48px;
        }
        .contacto-cta-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 34px; font-weight: 900; text-transform: uppercase;
          color: var(--crema); line-height: 1.1; margin-bottom: 16px;
        }
        .contacto-cta-sub {
          font-family: 'Barlow', sans-serif;
          font-size: 15px; color: rgba(240,240,236,0.7);
          line-height: 1.65; margin-bottom: 36px;
        }
        .btn-whatsapp {
          display: inline-flex; align-items: center; gap: 12px;
          background: #25d366; color: #0a1a0a;
          font-family: 'Barlow', sans-serif;
          font-size: 15px; font-weight: 700;
          letter-spacing: 0.06em; text-transform: uppercase;
          text-decoration: none; padding: 18px 40px;
          transition: background 0.2s, transform 0.2s;
          width: 100%; justify-content: center;
        }
        .btn-whatsapp:hover { background: #2ee672; transform: translateY(-2px); }

        /* FOOTER */
        .footer {
          background: var(--verde-oscuro);
          border-top: 1px solid rgba(92,184,92,0.15);
          padding: 48px 32px 32px;
        }
        .footer-inner {
          max-width: 1280px; margin: 0 auto;
          display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 60px;
          padding-bottom: 40px;
          border-bottom: 1px solid rgba(240,240,236,0.06);
        }
        .footer-brand-name {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 28px; font-weight: 900;
          color: var(--crema); letter-spacing: 0.05em;
        }
        .footer-brand-name span { color: var(--verde-lima); }
        .footer-tagline {
          font-family: 'Barlow', sans-serif;
          font-size: 12px; color: var(--gris);
          letter-spacing: 0.1em; text-transform: uppercase;
          margin-top: 6px; margin-bottom: 20px;
        }
        .footer-about {
          font-family: 'Barlow', sans-serif;
          font-size: 13px; color: var(--gris);
          line-height: 1.7; max-width: 320px;
        }
        .footer-col-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 14px; font-weight: 700;
          letter-spacing: 0.15em; text-transform: uppercase;
          color: var(--verde-lima); margin-bottom: 20px;
        }
        .footer-links { list-style: none; display: flex; flex-direction: column; gap: 12px; }
        .footer-links a {
          font-family: 'Barlow', sans-serif;
          font-size: 13px; color: var(--gris);
          text-decoration: none; transition: color 0.2s;
        }
        .footer-links a:hover { color: var(--crema); }
        .footer-bottom {
          max-width: 1280px; margin: 28px auto 0;
          display: flex; align-items: center; justify-content: space-between;
          font-family: 'Barlow', sans-serif;
          font-size: 12px; color: rgba(176,184,176,0.5);
          flex-wrap: wrap; gap: 12px;
        }

        /* PLAGA STRIP */
        .plagas-strip {
          background: var(--negro3);
          border-top: 1px solid rgba(92,184,92,0.1);
          border-bottom: 1px solid rgba(92,184,92,0.1);
          padding: 28px 32px;
          overflow: hidden;
        }
        .plagas-strip-inner {
          max-width: 1280px; margin: 0 auto;
          display: flex; align-items: center; gap: 0; justify-content: space-between;
          flex-wrap: wrap; gap: 8px;
        }
        .plaga-pill {
          display: flex; align-items: center; gap: 8px;
          font-family: 'Barlow', sans-serif;
          font-size: 12px; font-weight: 500;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--gris);
          padding: 8px 20px;
          border: 1px solid rgba(92,184,92,0.15);
        }

        @media (max-width: 1024px) {
          .hero-content { grid-template-columns: 1fr; }
          .hero-card { display: none; }
          .clientes-grid { grid-template-columns: repeat(2,1fr); }
          .servicios-grid { grid-template-columns: repeat(2,1fr); }
          .nosotros-grid { grid-template-columns: 1fr; gap: 40px; }
          .contacto-grid { grid-template-columns: 1fr; }
          .stats-inner { grid-template-columns: repeat(2,1fr); }
          .footer-inner { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 640px) {
          .nav-links { display: none; }
          .clientes-grid { grid-template-columns: 1fr; }
          .servicios-grid { grid-template-columns: 1fr; }
          .stats-inner { grid-template-columns: repeat(2,1fr); }
          .footer-inner { grid-template-columns: 1fr; gap: 32px; }
          .cofepris-band-inner { flex-direction: column; align-items: flex-start; }
          .cofepris-items { flex-direction: column; gap: 20px; }
          .section { padding: 70px 20px; }
          .hero-content { padding: 60px 20px; }
        }
      `}</style>

      {/* NAV */}
      <header className="nav">
        <div className="nav-inner">
          <a href="#inicio" className="nav-logo">
            TGR <span>FUMIGACIONES</span>
          </a>
          <nav>
            <ul className="nav-links">
              <li><a href="#inicio">Inicio</a></li>
              <li><a href="#servicios">Servicios</a></li>
              <li><a href="#nosotros">Nosotros</a></li>
              <li><a href="#contacto">Contacto</a></li>
              <li>
                <a href="https://wa.me/529932424463" className="nav-cta">
                  WhatsApp
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="hero" id="inicio">
        <img src="/hero.jpg" alt="TGR Fumigaciones" className="hero-img" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div>
            <div className="hero-badge">
              🛡️ Empresa Validada COFEPRIS
            </div>
            <h1 className="hero-title">
              Protegemos
              <span className="accent">Lo que más</span>
              importa
            </h1>
            <p className="hero-sub">
              Manejo y control de plagas para hogares, negocios y
              establecimientos regulados. Soluciones seguras, discretas
              y con garantía por escrito.
            </p>
            <div className="hero-actions">
              <a href="https://wa.me/529932424463" className="btn-primary">
                📲 Solicitar Servicio
              </a>
              <a href="#servicios" className="btn-secondary">
                Ver Servicios →
              </a>
            </div>
          </div>

          {/* Card derecha */}
          <div className="hero-card">
            <div className="hero-card-title">¿Por qué TGR?</div>
            <ul className="hero-card-list">
              {[
                "Técnicos certificados y capacitados",
                "Productos seguros de baja toxicidad",
                "Garantía por escrito en cada servicio",
                "Reportes digitales con evidencia fotográfica",
                "Atención personalizada y discreta",
                "Cumplimiento normativo COFEPRIS",
              ].map((item, i) => (
                <li key={i}>
                  <span className="check">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="cofepris-badge">
              <div className="cofepris-icon">🏛️</div>
              <div className="cofepris-text">
                <strong>Empresa Validada COFEPRIS</strong>
                <span>Cumplimos con la normativa sanitaria vigente</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-bar">
        <div className="stats-inner">
          {[
            { valor: "10+", label: "Años de experiencia" },
            { valor: "2,400+", label: "Clientes atendidos" },
            { valor: "98%", label: "Satisfacción garantizada" },
            { valor: "24h", label: "Tiempo de respuesta" },
          ].map((s, i) => (
            <div className="stat-item" key={i}>
              <div className="stat-value">{s.valor}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* STRIP PLAGAS */}
      <div className="plagas-strip">
        <div className="plagas-strip-inner">
          {["🪳 Cucarachas","🐀 Roedores","🐜 Hormigas","🦟 Mosquitos","🦂 Alacranes","🕷️ Arácnidos","🐝 Avispas","🐛 Chinches"].map((p,i)=>(
            <div className="plaga-pill" key={i}>{p}</div>
          ))}
        </div>
      </div>

      {/* CLIENTES */}
      <section className="section clientes-bg" id="clientes">
        <div className="section-inner">
          <div className="section-label">A quién servimos</div>
          <h2 className="section-title">
            Soluciones para<br /><span className="verde">cada entorno</span>
          </h2>
          <p className="section-desc">
            Desde casas habitación hasta establecimientos regulados por COFEPRIS.
            Adaptamos cada tratamiento a tu espacio y necesidad.
          </p>
          <div className="clientes-grid">
            {[
              { icon: "🏠", titulo: "Casa Habitación", desc: "Control de insectos rastreros y voladores, eliminación de roedores. Aplicación segura para tu familia y mascotas." },
              { icon: "🏘️", titulo: "Residenciales", desc: "Manejo integrado en áreas comunes, jardines, albercas y estacionamientos con bitácoras y reportes." },
              { icon: "🍽️", titulo: "Negocios y Oficinas", desc: "Ambientes libres de plagas sin interrumpir operaciones. Planes mensuales, bimestrales o trimestrales." },
              { icon: "🏥", titulo: "Establecimientos Regulados", desc: "Cumplimiento normativo para restaurantes, hoteles, clínicas y laboratorios. Productos grado alimenticio." },
            ].map((c,i) => (
              <div className="cliente-card" key={i}>
                <div className="cliente-icon">{c.icon}</div>
                <div className="cliente-title">{c.titulo}</div>
                <div className="cliente-desc">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="section servicios-bg" id="servicios">
        <div className="section-inner">
          <div className="servicios-header">
            <div>
              <div className="section-label">Nuestros servicios</div>
              <h2 className="section-title">
                Control integral<br /><span className="verde">de plagas</span>
              </h2>
            </div>
            <a href="https://wa.me/529932424463" className="btn-primary">
              Cotización gratis →
            </a>
          </div>
          <div className="servicios-grid">
            {[
              { icon: "🪳", num: "01", titulo: "Control de Cucarachas", desc: "Tratamientos con gel y aspersión profunda para eliminar infestaciones rápidamente en cualquier área." },
              { icon: "🐀", num: "02", titulo: "Control de Roedores", desc: "Sistemas de control físico y químico certificados para proteger tu espacio sin riesgos." },
              { icon: "🐜", num: "03", titulo: "Control de Termitas", desc: "Diagnóstico estructural y tratamiento preventivo o correctivo de alta precisión." },
              { icon: "🦟", num: "04", titulo: "Control de Mosquitos", desc: "Nebulización y larvicidas para reducir vectores de enfermedades como dengue y chikungunya." },
              { icon: "🏢", num: "05", titulo: "Servicios Comerciales", desc: "Planes de manejo integrado para empresas, restaurantes, hoteles y clínicas con bitácoras mensuales." },
              { icon: "🏠", num: "06", titulo: "Servicios Residenciales", desc: "Atención rápida y discreta con protocolos seguros adaptados a familias y mascotas." },
            ].map((s,i) => (
              <div className="servicio-card" key={i} data-num={s.num}>
                <div className="servicio-icon">{s.icon}</div>
                <div className="servicio-title">{s.titulo}</div>
                <div className="servicio-desc">{s.desc}</div>
                <a href="https://wa.me/529932424463" className="servicio-link">
                  Solicitar servicio →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COFEPRIS BAND */}
      <div className="cofepris-band">
        <div className="cofepris-band-inner">
          <div className="cofepris-band-left">
            <div className="cofepris-big-icon">🏛️</div>
            <div className="cofepris-band-title">
              Empresa Validada COFEPRIS
              <span>Cumplimos con la normativa sanitaria vigente para el manejo y control de plagas.</span>
            </div>
          </div>
          <div className="cofepris-items">
            {[
              { icon: "📋", title: "Carpeta COFEPRIS", sub: "Gestión y actualización conforme a lineamientos vigentes" },
              { icon: "📚", title: "Capacitación", sub: "Cursos de buenas prácticas y control integrado" },
              { icon: "📁", title: "Documentación", sub: "Registros, bitácoras e informes técnicos por servicio" },
            ].map((item, i) => (
              <div className="cofepris-item" key={i}>
                <div className="cofepris-item-icon">{item.icon}</div>
                <div className="cofepris-item-text">
                  <strong>{item.title}</strong>
                  <span>{item.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* NOSOTROS */}
      <section className="section nosotros-bg" id="nosotros">
        <div className="section-inner">
          <div className="nosotros-grid">
            <div>
              <div className="section-label">Sobre nosotros</div>
              <h2 className="section-title">
                Más que<br />
                <span className="verde">eliminar plagas,</span><br />
                protegemos tu entorno
              </h2>
              <p className="section-desc">
                En TGR Fumigaciones llevamos más de 10 años brindando
                soluciones profesionales de manejo y control de plagas en
                Tabasco. Nuestro compromiso: resultados reales, productos
                seguros y atención personalizada en cada visita.
              </p>
              <div style={{ marginTop: 40 }}>
                <a href="https://wa.me/529932424463" className="btn-primary">
                  Agendar visita →
                </a>
              </div>
            </div>
            <div className="nosotros-visual">
              <ul className="nosotros-list">
                {[
                  { icon: "🎓", title: "Personal certificado", desc: "Técnicos con capacitación constante en manejo higiénico y control integrado de plagas." },
                  { icon: "🧪", title: "Productos seguros", desc: "Baja toxicidad, grado alimenticio cuando se requiere. Sin riesgo para tu familia ni mascotas." },
                  { icon: "📊", title: "Reportes digitales", desc: "Evidencia fotográfica, bitácoras y fichas técnicas entregadas después de cada servicio." },
                  { icon: "✍️", title: "Garantía por escrito", desc: "Respaldo documentado en cada servicio. Si el problema regresa, nosotros regresamos." },
                ].map((item, i) => (
                  <li key={i}>
                    <div className="nl-icon">{item.icon}</div>
                    <div>
                      <div className="nl-title">{item.title}</div>
                      <div className="nl-desc">{item.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="section contacto-bg" id="contacto">
        <div className="section-inner">
          <div className="section-label">Contáctanos</div>
          <h2 className="section-title">
            Solicita tu<br /><span className="verde">cotización gratis</span>
          </h2>
          <div className="contacto-grid">
            <div className="contacto-info">
              {[
                { icon: "📞", label: "Teléfono / WhatsApp", content: <a href="tel:+529932424463">993 242 4463</a> },
                { icon: "✉️", label: "Correo principal", content: <a href="mailto:contacto.tgrfumigaciones@gmail.com">contacto.tgrfumigaciones@gmail.com</a> },
                { icon: "✉️", label: "Correo alternativo", content: <a href="mailto:tgrfumigaciones@gmail.com">tgrfumigaciones@gmail.com</a> },
                { icon: "🌐", label: "Sitio web", content: <a href="https://tgr-fumigaciones.vercel.app/">www.tgr-fumigaciones.vercel.app</a> },
                { icon: "📍", label: "Cobertura", content: <p>Villahermosa y área metropolitana, Tabasco</p> },
              ].map((item, i) => (
                <div className="contacto-item" key={i}>
                  <div className="contacto-item-icon">{item.icon}</div>
                  <div className="contacto-item-body">
                    <strong>{item.label}</strong>
                    {item.content}
                  </div>
                </div>
              ))}
            </div>
            <div className="contacto-cta-box">
              <div className="contacto-cta-title">
                ¿Tienes una plaga?<br />Te ayudamos hoy.
              </div>
              <div className="contacto-cta-sub">
                Escríbenos por WhatsApp y recibe una cotización sin compromiso.
                Respondemos en menos de 24 horas. Servicio disponible para hogares,
                negocios y establecimientos regulados.
              </div>
              <a href="https://wa.me/529932424463" className="btn-whatsapp">
                💬 Escribir por WhatsApp
              </a>
              <div style={{ marginTop: 24, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                {["🛡️ Garantía por escrito","⚡ Respuesta en 24h","✅ Empresa COFEPRIS"].map((t,i)=>(
                  <span key={i} style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, color: "rgba(240,240,236,0.6)" }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div>
            <div className="footer-brand-name">TGR <span>FUMIGACIONES</span></div>
            <div className="footer-tagline">Manejo y Control de Plagas</div>
            <p className="footer-about">
              Empresa validada por COFEPRIS dedicada al control profesional
              de plagas en hogares, negocios y establecimientos regulados
              en Tabasco, México.
            </p>
          </div>
          <div>
            <div className="footer-col-title">Servicios</div>
            <ul className="footer-links">
              {["Control de Cucarachas","Control de Roedores","Control de Termitas","Control de Mosquitos","Servicios Comerciales","Servicios Residenciales"].map((s,i)=>(
                <li key={i}><a href="#servicios">{s}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Contacto</div>
            <ul className="footer-links">
              <li><a href="tel:+529932424463">993 242 4463</a></li>
              <li><a href="mailto:contacto.tgrfumigaciones@gmail.com">contacto.tgrfumigaciones@gmail.com</a></li>
              <li><a href="https://tgr-fumigaciones.vercel.app/">www.tgr-fumigaciones.vercel.app</a></li>
              <li><a href="#inicio">Villahermosa, Tabasco</a></li>
            </ul>
            <div style={{ marginTop: 28 }}>
              <a href="https://wa.me/529932424463" className="btn-primary" style={{ fontSize: 13, padding: "12px 24px" }}>
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 TGR Fumigaciones. Todos los derechos reservados.</span>
          <span>Seguridad · Salud · Confianza · Experiencia</span>
        </div>
      </footer>
    </div>
  );
}
