'use client'
import { useState, useEffect } from 'react'
import Reveal from './Reveal'
import { supabase } from '../lib/supabase'

const STATIC_ITEMS = [
  { cat: 'muebles',      thumb: 'p-muebles',      icon: '🛋️', title: 'Armario empotrado roble',    label: 'Muebles' },
  { cat: 'cocinas',      thumb: 'p-cocinas',      icon: '🍳', title: 'Cocina en madera maciza',     label: 'Cocinas' },
  { cat: 'puertas',      thumb: 'p-puertas',      icon: '🚪', title: 'Puerta de entrada nogal',     label: 'Puertas' },
  { cat: 'exteriores',   thumb: 'p-exteriores',   icon: '🏡', title: 'Pérgola de jardín',           label: 'Exteriores' },
  { cat: 'muebles',      thumb: 'p-restauracion', icon: '🔄', title: 'Restauración cómoda antigua',  label: 'Muebles' },
  { cat: 'muebles',      thumb: 'p-escaleras',    icon: '🪜', title: 'Escalera madera maciza',      label: 'Muebles' },
]

const FILTERS = [
  { key: 'all',        label: 'Todos' },
  { key: 'muebles',    label: 'Muebles' },
  { key: 'puertas',    label: 'Puertas' },
  { key: 'cocinas',    label: 'Cocinas' },
  { key: 'exteriores', label: 'Exteriores' },
  { key: 'parquet',    label: 'Parquet' },
  { key: 'restauracion', label: 'Restauración' },
]

const SERVICE_LABELS = {
  muebles: 'Muebles', cocinas: 'Cocinas', puertas: 'Puertas',
  exteriores: 'Exteriores', parquet: 'Parquet', restauracion: 'Restauración', escaleras: 'Escaleras',
}

export default function Portfolio() {
  const [active, setActive]     = useState('all')
  const [dbMedia, setDbMedia]   = useState([])
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    supabase.from('media').select('*').order('created_at', { ascending: false })
      .then(({ data }) => setDbMedia(data || []))
  }, [])

  const allItems = [
    ...dbMedia.map(m => ({ fromDb: true, ...m })),
    ...STATIC_ITEMS,
  ]

  const filtered = active === 'all' ? allItems : allItems.filter(item => {
    const cat = item.fromDb ? item.tipo_servicio : item.cat
    return cat === active
  })

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
        {filtered.map((item, i) => (
          item.fromDb ? (
            <div key={item.id} className="portfolio-item" onClick={() => setLightbox(item)}>
              {item.tipo_media === 'video' ? (
                <video src={item.url} className="portfolio-media" muted playsInline />
              ) : (
                <img src={item.url} alt={item.titulo || ''} className="portfolio-media" />
              )}
              <div className="portfolio-overlay">
                <h4>{item.titulo || SERVICE_LABELS[item.tipo_servicio]}</h4>
                <span>{SERVICE_LABELS[item.tipo_servicio]} {item.tipo_media === 'video' ? '· 🎥' : ''}</span>
              </div>
            </div>
          ) : (
            <div key={i} className={`portfolio-item ${active !== 'all' && active !== item.cat ? 'hidden' : ''}`}>
              <div className={`portfolio-thumb ${item.thumb}`}>{item.icon}</div>
              <div className="portfolio-overlay">
                <h4>{item.title}</h4>
                <span>{item.label}</span>
              </div>
            </div>
          )
        ))}
      </div>

      {/* LIGHTBOX */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <div className="lightbox-inner" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
            {lightbox.tipo_media === 'video' ? (
              <video src={lightbox.url} controls autoPlay style={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: 12 }} />
            ) : (
              <img src={lightbox.url} alt={lightbox.titulo || ''} style={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: 12, objectFit: 'contain' }} />
            )}
            {lightbox.titulo && <p className="lightbox-title">{lightbox.titulo}</p>}
          </div>
        </div>
      )}
    </section>
  )
}
