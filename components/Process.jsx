import Reveal from './Reveal'

const STEPS = [
  { icon: '💬', title: 'Consulta inicial',     desc: 'Nos cuentas tu idea o necesidad. Visita gratuita al domicilio para tomar medidas y entender el espacio.' },
  { icon: '📐', title: 'Diseño y presupuesto', desc: 'Elaboramos planos detallados y un presupuesto sin sorpresas en menos de 24 horas.' },
  { icon: '🪵', title: 'Selección de madera',  desc: 'Elegimos juntos el tipo de madera, acabados y detalles. Trabajamos solo con proveedores certificados.' },
  { icon: '⚙️', title: 'Fabricación',          desc: 'Elaboramos cada pieza en nuestro taller con precisión milimétrica y control de calidad constante.' },
  { icon: '🔧', title: 'Instalación',          desc: 'Nuestro equipo instala todo en el tiempo acordado, cuidando cada detalle de la puesta en escena.' },
  { icon: '✅', title: 'Entrega y garantía',    desc: 'Revisamos contigo el resultado final. 5 años de garantía y soporte postventa incluidos.' },
]

export default function Process() {
  return (
    <section id="proceso">
      <Reveal className="process-header">
        <span className="section-tag" style={{ background: 'var(--brown-light)' }}>Proceso</span>
        <h2 className="section-title">¿Cómo trabajamos?</h2>
        <p className="section-sub">Un proceso claro y transparente desde la primera conversación hasta la entrega final.</p>
      </Reveal>
      <div className="steps">
        {STEPS.map(s => (
          <Reveal key={s.title} className="step">
            <div className="step-icon">{s.icon}</div>
            <h4>{s.title}</h4>
            <p>{s.desc}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
