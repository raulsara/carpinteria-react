import Reveal from './Reveal'

const REVIEWS = [
  { text: 'El armario que me hicieron a medida es exactamente lo que imaginaba. Calidad excelente y el equipo muy profesional en todo momento.', name: 'María García',   sub: 'Armario empotrado · Madrid' },
  { text: 'Nos reformaron toda la cocina en madera de roble. El resultado superó todas las expectativas. Presupuesto claro y sin sorpresas.',    name: 'Carlos Ruiz',    sub: 'Cocina integral · Barcelona' },
  { text: 'Restauraron un mueble de mi abuela que parecía imposible de salvar. Quedó como nuevo, con mimo y detalle artesanal único.',           name: 'Ana López',      sub: 'Restauración · Sevilla' },
  { text: 'Instalaron el parquet de toda la vivienda en tiempo récord y con un acabado impecable. Se nota la experiencia en cada detalle.',      name: 'Javier Molina',  sub: 'Parquet de roble · Valencia' },
  { text: 'La puerta de entrada en nogal macizo es espectacular. Aíslan genial y el diseño encaja perfecto con la casa. Cien por cien recomendables.', name: 'Laura Fernández', sub: 'Puerta exterior · Zaragoza' },
  { text: 'Nos construyeron una pérgola de madera tratada para la terraza. Dos años después sigue como el primer día. Trabajo limpio y puntuales.',    name: 'Pedro Navarro',   sub: 'Pérgola exterior · Málaga' },
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
