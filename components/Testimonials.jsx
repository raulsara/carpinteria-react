import Reveal from './Reveal'

const REVIEWS = [
  { text: 'El armario que me hicieron a medida es exactamente lo que imaginaba. Calidad excelente y el equipo muy profesional en todo momento.', name: 'María García',  sub: 'Armario empotrado · Madrid' },
  { text: 'Nos reformaron toda la cocina en madera de roble. El resultado superó todas las expectativas. Presupuesto claro y sin sorpresas.',      name: 'Carlos Ruiz',   sub: 'Cocina integral · Barcelona' },
  { text: 'Restauraron un mueble de mi abuela que parecía imposible de salvar. Quedó como nuevo, con mimo y detalle artesanal único.',             name: 'Ana López',     sub: 'Restauración · Sevilla' },
]

export default function Testimonials() {
  return (
    <section id="testimonios">
      <Reveal className="testimonios-header">
        <span className="section-tag">Testimonios</span>
        <h2 className="section-title">Lo que dicen nuestros clientes</h2>
      </Reveal>
      <div className="testimonios-grid">
        {REVIEWS.map(r => (
          <Reveal key={r.name} className="testimonial-card">
            <div className="quote-mark">"</div>
            <div className="stars">★★★★★</div>
            <p>{r.text}</p>
            <div className="reviewer">
              <div className="reviewer-avatar">👤</div>
              <div className="reviewer-info">
                <strong>{r.name}</strong>
                <span>{r.sub}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
