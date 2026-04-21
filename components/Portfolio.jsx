'use client'
import { useState, useEffect } from 'react'
import Reveal from './Reveal'
import { supabase } from '../lib/supabase'
import { useLang } from '../lib/i18n'

const SERVICE_LABEL_KEYS = {
  muebles:            'services.muebles',
  cocinas:            'services.cocinas',
  puertas:            'services.puertas',
  puertas_interiores: 'puertas.interiores',
  puertas_exteriores: 'puertas.exteriores',
  puertas_vidrio:     'puertas.vidrio',
  puertas_lacadas:    'puertas.lacadas',
  exteriores:         'services.terrazas',
  parquet:            'services.parquet',
  restauracion:       'services.restauracion',
  escaleras:          'services.estructuras',
}

export default function Portfolio() {
  const { t } = useLang()
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

  const filtered = active === 'all' ? media : media.filter(m => matchCat(m, active))

  const FILTERS = [
    { key: 'all',          label: t('portfolio.filters.all') },
    { key: 'muebles',      label: t('portfolio.filters.muebles') },
    { key: 'cocinas',      label: t('portfolio.filters.cocinas') },
    { key: 'puertas',      label: t('portfolio.filters.puertas') },
    { key: 'exteriores',   label: t('portfolio.filters.exteriores') },
    { key: 'parquet',      label: t('portfolio.filters.parquet') },
    { key: 'restauracion', label: t('portfolio.filters.restauracion') },
    { key: 'escaleras',    label: t('portfolio.filters.escaleras') },
  ]

  const labelOf = (key) => {
    const tk = SERVICE_LABEL_KEYS[key]
    return tk ? t(tk) : key
  }

  return (
    <section id="portfolio">
      <Reveal className="portfolio-header">
        <span className="section-tag">{t('portfolio.tag')}</span>
        <h2 className="section-title">{t('portfolio.title')}</h2>
        <p className="section-sub">{t('portfolio.subtitle')}</p>
      </Reveal>
      <Reveal className="portfolio-filters">
        {FILTERS.map(f => {
          const count = f.key === 'all' ? media.length : media.filter(m => matchCat(m, f.key)).length
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
        <p className="portfolio-empty">{t('portfolio.loading')}</p>
      ) : filtered.length === 0 ? (
        <p className="portfolio-empty">
          {active === 'all' ? t('portfolio.emptyAll') : t('portfolio.emptyCat')(labelOf(active))}
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
              </div>
              {item.descripcion && <p className="portfolio-desc">{item.descripcion}</p>}
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
