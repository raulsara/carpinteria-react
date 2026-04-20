import Reveal from './Reveal'

export default function Hero() {
  return (
    <section id="hero">
      <Reveal className="hero-content">
        <div className="hero-badge">✦ Carpintería Artesanal Premium</div>
        <h1>Madera que cuenta<br /><em>historias eternas</em></h1>
        <p>Creamos muebles, puertas y espacios de madera hechos a medida con precisión artesanal y materiales de primera calidad.</p>
        <div className="hero-btns">
          <a href="#contacto" className="btn-primary">Solicitar presupuesto</a>
          <a href="#portfolio" className="btn-outline">Ver trabajos</a>
        </div>
        <div className="hero-stats">
          <div className="stat"><strong>30+</strong><span>Años de experiencia</span></div>
          <div className="stat"><strong>640</strong><span>Proyectos completados</span></div>
          <div className="stat"><strong>100%</strong><span>Clientes satisfechos</span></div>
        </div>
      </Reveal>
    </section>
  )
}
