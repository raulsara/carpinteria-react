export default function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand">
          <a href="#hero" className="nav-logo">Mader<span>Arte</span></a>
          <p>Carpintería artesanal con más de 35 años de experiencia. Cada pieza, una obra.</p>
        </div>
        <div className="footer-col">
          <h5>Servicios</h5>
          <ul>
            <li><a href="#servicios">Muebles a medida</a></li>
            <li><a href="#servicios">Cocinas integrales</a></li>
            <li><a href="#servicios">Puertas y ventanas</a></li>
            <li><a href="#servicios">Terrazas</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>Empresa</h5>
          <ul>
            <li><a href="#nosotros">Sobre nosotros</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#proceso">Cómo trabajamos</a></li>
            <li><a href="#testimonios">Clientes</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>Contacto</h5>
          <ul>
            <li><a href="#contacto">Pedir presupuesto</a></li>
            <li><a href="tel:+34607826072">+34 607 826 072</a></li>
            <li><a href="mailto:info@maderarte.es">info@maderarte.es</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} MaderArte. Todos los derechos reservados.</p>
        <p>Hecho con ♥ en España</p>
      </div>
    </footer>
  )
}
