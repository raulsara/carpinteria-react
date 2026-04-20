'use client'
import { useState, useEffect } from 'react'
import Reveal from './Reveal'
import { supabase } from '../lib/supabase'

const FILTERS = [
  { key: 'all',          label: 'Todos' },
  { key: 'muebles',      label: 'Muebles' },
  { key: 'cocinas',      label: 'Cocinas' },
  { key: 'puertas',      label: 'Puertas' },
  { key: 'exteriores',   label: 'Exteriores' },
  { key: 'parquet',      label: 'Parquet' },
  { key: 'restauracion', label: 'Restauración' },
  { key: 'escaleras',    label: 'Escaleras' },
]

const SERVICE_LABELS = {
  muebles:            'Muebles a medida',
  cocinas:            'Cocinas integrales',
  puertas:            'Puertas y ventanas',
  puertas_interiores: 'Puertas interiores',
  puertas_exteriores: 'Puertas exteriores',
  puertas_vidrio:     'Puertas con vidrio',
  puertas_lacadas:    'Puertas lacadas',
  exteriores:         'Terrazas y exteriores',
  parquet:            'Instalación de parquet',
  parquet_catalogo:   'Catálogo de parquet',
  restauracion:       'Restauración',
  escaleras:          'Estructuras y escaleras',
}

export default function Portfolio() {
  const [active, setActive]     = useState('all')
  const [media, setMedia]       = useState([])
  const [loading, setLoading]   = useState(true)
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    supabase.from('media')
      .select('*')
      .neq('tipo_servicio', 'parquet_catalogo')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setMedia(data || [])
        setLoading(false)
      })
  }, [])

  const matchCat = (m, key) => m.tipo_servicio === key
    || (key === 'puertas' && m.tipo_servicio?.startsWith('puertas_'))

  const filtered = active === 'all'
    ? media
    : media.filter(m => matchCat(m, active))

  return (
    <section id="portfolio">
      <Reveal className="portfolio-header">
        <span className="section-tag">Galería</span>
        <h2 className="section-title">Trabajos que hablan por sí solos</h2>
        <p className="section-sub">Una selección de proyectos recientes en distintas especialidades.</p>
      </Reveal>
      <Reveal className="portfolio-filters">
        {FILTERS.map(f => {
          const count = f.key === 'all'
            ? media.length
            : media.filter(m => matchCat(m, f.key)).length
          return (
            <button
              key={f.key}
              className={`filter-btn ${active === f.key ? 'active' : ''}`}
              onClick={() => setActive(f.key)}
            >
              {f.label} {count > 0 && <span className="filter-count">({count})</span>}
            </button>
          )
        })}
      </Reveal>

      {loading ? (
        <p className="portfolio-empty">Cargando trabajos...</p>
      ) : filtered.length === 0 ? (
        <p className="portfolio-empty">
          {active === 'all'
            ? 'Aún no hay trabajos publicados. ¡Vuelve pronto!'
            : `Aún no tenemos fotos de "${SERVICE_LABELS[active] || active}" publicadas.`}
        </p>
      ) : (
        <div className="portfolio-grid">
          {filtered.map(item => (
            <div key={item.id} className="portfolio-card">
              <div className="portfolio-item" onClick={() => setLightbox(item)}>
                {item.tipo_media === 'video' ? (
                  <video src={item.url} className="portfolio-media" muted playsInline />
                ) : (
                  <img src={item.url} alt={item.titulo || ''} className="portfolio-media" loading="lazy" />
                )}
                <div className="portfolio-overlay">
                  <h4>{item.titulo || SERVICE_LABELS[item.tipo_servicio]}</h4>
                  <span>{SERVICE_LABELS[item.tipo_servicio]} {item.tipo_media === 'video' ? '· 🎥' : ''}</span>
                </div>
              </div>
              {item.descripcion && (
                <p className="portfolio-desc">{item.descripcion}</p>
              )}
            </div>
          ))}
        </div>
      )}

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
