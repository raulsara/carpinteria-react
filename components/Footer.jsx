export default function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand">
          <a href="#hero" className="nav-logo">Mader<span>Arte</span></a>
          <p>Carpintería artesanal con más de 35 años de experiencia. Cada pieza, una obra.</p>
          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
          </div>
        </div>
        <div className="footer-col footer-col-tight">
          <h5>Servicios</h5>
          <ul>
            <li><a href="/parquet">Instalación de parquet</a></li>
            <li><a href="/puertas">Puertas y ventanas</a></li>
            <li><a href="#servicios">Cocinas integrales</a></li>
            <li><a href="#servicios">Terrazas y exteriores</a></li>
            <li><a href="#servicios">Muebles a medida</a></li>
            <li><a href="#servicios">Estructuras de madera</a></li>
            <li><a href="#servicios">Restauración</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>Empresa</h5>
          <ul>
            <li><a href="#nosotros">Quiénes somos</a></li>
            <li><a href="#portfolio">Galería</a></li>
            <li><a href="#proceso">Cómo trabajamos</a></li>
            <li><a href="#testimonios">Clientes</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>Contacto</h5>
          <ul>
            <li><a href="#presupuesto">Pedir presupuesto</a></li>
            <li><a href="#contacto">Contacto</a></li>
            <li><a href="tel:+34607826072">+34 607 826 072</a></li>
            <li><a href="mailto:info@maderarte.es">info@maderarte.es</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} MaderArte. Todos los derechos reservados.</p>
        <div className="footer-legal">
          <a href="/aviso-legal">Aviso legal</a>
          <a href="/politica-privacidad">Política de privacidad</a>
          <a href="/politica-cookies">Política de cookies</a>
        </div>
      </div>
    </footer>
  )
}
