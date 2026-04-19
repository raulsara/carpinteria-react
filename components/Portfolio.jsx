'use client'
import { useState } from 'react'
import Reveal from './Reveal'

const ITEMS = [
  { cat: 'muebles',    thumb: 'p-muebles',     icon: '🛋️', title: 'Armario empotrado roble',   label: 'Muebles' },
  { cat: 'cocinas',    thumb: 'p-cocinas',     icon: '🍳', title: 'Cocina en madera maciza',    label: 'Cocinas' },
  { cat: 'puertas',   thumb: 'p-puertas',     icon: '🚪', title: 'Puerta de entrada nogal',    label: 'Puertas' },
  { cat: 'exteriores', thumb: 'p-exteriores',  icon: '🏡', title: 'Pérgola de jardín',          label: 'Exteriores' },
  { cat: 'muebles',   thumb: 'p-restauracion', icon: '🔄', title: 'Restauración cómoda antigua', label: 'Muebles' },
  { cat: 'muebles',   thumb: 'p-escaleras',   icon: '🪜', title: 'Escalera madera maciza',     label: 'Muebles' },
]

const FILTERS = [
  { key: 'all',        label: 'Todos' },
  { key: 'muebles',   label: 'Muebles' },
  { key: 'puertas',   label: 'Puertas' },
  { key: 'cocinas',   label: 'Cocinas' },
  { key: 'exteriores', label: 'Exteriores' },
]

export default function Portfolio() {
  const [active, setActive] = useState('all')

  return (
    <section id="portfolio">
      <Reveal className="portfolio-header">
        <span className="section-tag">Portfolio</span>
        <h2 className="section-title">Trabajos que hablan por sí solos</h2>
        <p className="section-sub">Una selección de proyectos recientes en distintas especialidades.</p>
      </Reveal>
      <Reveal className="portfolio-filters">
        {FILTERS.map(f => (
          <button
            key={f.key}
            className={`filter-btn ${active === f.key ? 'active' : ''}`}
            onClick={() => setActive(f.key)}
          >
            {f.label}
          </button>
        ))}
      </Reveal>
      <div className="portfolio-grid">
        {ITEMS.map((item, i) => (
          <div
            key={i}
            className={`portfolio-item ${active !== 'all' && active !== item.cat ? 'hidden' : ''}`}
          >
            <div className={`portfolio-thumb ${item.thumb}`}>{item.icon}</div>
            <div className="portfolio-overlay">
              <h4>{item.title}</h4>
              <span>{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
