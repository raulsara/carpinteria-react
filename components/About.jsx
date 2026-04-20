import Reveal from './Reveal'

export default function About() {
  return (
    <section id="nosotros" style={{ background: 'var(--cream)', padding: '96px 6%' }}>
      <div className="about-wrap">
        <Reveal className="about-visual">
          <div className="about-img-main">🪵</div>
          <div className="about-badge-float">
            <strong>35</strong>
            <span>años de oficio</span>
          </div>
        </Reveal>
        <Reveal className="about-text">
          <span className="section-tag">Nosotros</span>
          <h2 className="section-title">Pasión por la madera desde 1991</h2>
          <p>Somos un taller familiar con más de 35 años de experiencia en carpintería artesanal. Combinamos técnicas tradicionales con herramientas modernas para garantizar resultados perfectos.</p>
          <p>Cada pieza que fabricamos lleva el sello de nuestra dedicación: materiales seleccionados, acabados impecables y plazos de entrega cumplidos.</p>
          <ul className="checklist">
            <li>Maderas certificadas y sostenibles</li>
            <li>Presupuesto sin compromiso en 24h</li>
            <li>Garantía de 5 años en todos los trabajos</li>
            <li>Instalación incluida en toda la provincia</li>
            <li>Diseño personalizado con visita al domicilio</li>
          </ul>
          <a href="#contacto" className="btn-primary">Hablar con un carpintero</a>
        </Reveal>
      </div>
    </section>
  )
}
