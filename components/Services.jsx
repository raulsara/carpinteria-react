'use client'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import Reveal from './Reveal'

const SERVICES = [
  { icon: '🪑', title: 'Muebles a Medida',       desc: 'Diseñamos y fabricamos muebles personalizados para cada rincón de tu hogar u oficina: armarios, estanterías, mesas y más.' },
  { icon: '🚪', title: 'Puertas y Ventanas',      desc: 'Carpintería exterior e interior en maderas nobles. Fabricación e instalación con sellado perfecto y acabado a medida.', href: '/puertas' },
  { icon: '🍳', title: 'Cocinas Integrales',      desc: 'Cocinas completas en madera maciza o lacada, con diseño funcional y estética impecable adaptada a tu espacio.' },
  { icon: '🏡', title: 'Terrazas y Exteriores',   desc: 'Pérgolas, tarimas, cerramientos y mobiliario para exterior con maderas tratadas que resisten la intemperie.' },
  { icon: '🔨', title: 'Restauración',            desc: 'Devolvemos la vida a muebles y estructuras antiguas: lijado, tratamiento, barnizado y reparación de daños.' },
  { icon: '🪵', title: 'Estructuras de Madera',   desc: 'Escaleras, techos, forjados y estructuras de madera para proyectos de construcción y reforma integrales.' },
  { icon: '🟫', title: 'Instalación de Parquet',  desc: 'Colocación de parquet macizo, laminado y multicapa con acabados perfectos. Lijado, barnizado y restauración de suelos.' },
]

function ServiceCard({ s }) {
  const ref = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) ref.current?.classList.add('visible') },
      { threshold: 0.12 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const body = (
    <>
      <div className="service-icon">{s.icon}</div>
      <h3>{s.title}</h3>
      <p>{s.desc}</p>
      {s.href && <span className="service-link">Ver catálogo →</span>}
    </>
  )

  return s.href ? (
    <Link ref={ref} href={s.href} className="reveal service-card service-card-link">
      {body}
    </Link>
  ) : (
    <div ref={ref} className="reveal service-card">
      {body}
    </div>
  )
}

export default function Services() {
  return (
    <section id="servicios">
      <Reveal className="services-header">
        <span className="section-tag">Servicios</span>
        <h2 className="section-title">Todo en madera, hecho a tu medida</h2>
        <p className="section-sub">Cada proyecto es único. Trabajamos desde el diseño hasta la instalación final con dedicación total.</p>
      </Reveal>
      <div className="services-grid">
        {SERVICES.map(s => <ServiceCard key={s.title} s={s} />)}
      </div>
    </section>
  )
}
