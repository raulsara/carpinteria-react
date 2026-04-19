import Reveal from './Reveal'

const SERVICES = [
  { icon: '🪑', title: 'Muebles a Medida',       desc: 'Diseñamos y fabricamos muebles personalizados para cada rincón de tu hogar u oficina: armarios, estanterías, mesas y más.' },
  { icon: '🚪', title: 'Puertas y Ventanas',      desc: 'Carpintería exterior e interior en maderas nobles. Fabricación e instalación con sellado perfecto y acabado a medida.' },
  { icon: '🍳', title: 'Cocinas Integrales',      desc: 'Cocinas completas en madera maciza o lacada, con diseño funcional y estética impecable adaptada a tu espacio.' },
  { icon: '🏡', title: 'Terrazas y Exteriores',   desc: 'Pérgolas, tarimas, cerramientos y mobiliario para exterior con maderas tratadas que resisten la intemperie.' },
  { icon: '🔨', title: 'Restauración',            desc: 'Devolvemos la vida a muebles y estructuras antiguas: lijado, tratamiento, barnizado y reparación de daños.' },
  { icon: '🪵', title: 'Estructuras de Madera',   desc: 'Escaleras, techos, forjados y estructuras de madera para proyectos de construcción y reforma integrales.' },
  { icon: '🟫', title: 'Instalación de Parquet',  desc: 'Colocación de parquet macizo, laminado y multicapa con acabados perfectos. Lijado, barnizado y restauración de suelos.' },
]

export default function Services() {
  return (
    <section id="servicios">
      <Reveal className="services-header">
        <span className="section-tag">Servicios</span>
        <h2 className="section-title">Todo en madera, hecho a tu medida</h2>
        <p className="section-sub">Cada proyecto es único. Trabajamos desde el diseño hasta la instalación final con dedicación total.</p>
      </Reveal>
      <div className="services-grid">
        {SERVICES.map(s => (
          <Reveal key={s.title} className="service-card">
            <div className="service-icon">{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
