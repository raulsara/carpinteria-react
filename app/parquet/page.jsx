'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function ParquetPage() {
  const [items, setItems]       = useState([])
  const [loading, setLoading]   = useState(true)
  const [lightbox, setLightbox] = useState(null)
  const [page, setPage]         = useState(0)
  const trackRef = useRef(null)

  const PER_PAGE = 5

  useEffect(() => {
    supabase.from('media')
      .select('*')
      .eq('tipo_servicio', 'parquet_catalogo')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setItems(data || [])
        setLoading(false)
      })
  }, [])

  const totalPages = Math.max(1, Math.ceil(items.length / PER_PAGE))

  function go(dir) {
    const next = (page + dir + totalPages) % totalPages
    setPage(next)
  }

  const visible = items.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE)

  return (
    <main className="subpage">
      <div className="subpage-head">
        <span className="section-tag">Catálogo</span>
        <h1 className="section-title">Catálogo suelos de parquet</h1>
        <p className="section-sub">Macizo, laminado y multicapa. Elige el acabado que mejor encaje con tu espacio.</p>
      </div>

      {loading ? (
        <p className="portfolio-empty">Cargando catálogo...</p>
      ) : items.length === 0 ? (
        <div className="portfolio-empty">
          <p>Estamos preparando el catálogo de parquets.</p>
          <Link href="/#contacto" className="btn-primary" style={{ marginTop: 20, display: 'inline-block' }}>
            Consultar directamente
          </Link>
        </div>
      ) : (
        <div className="carousel-wrap">
          {totalPages > 1 && (
            <button className="carousel-arrow carousel-prev" onClick={() => go(-1)} aria-label="Anterior">‹</button>
          )}
          <div className="carousel-track" ref={trackRef}>
            {visible.map(item => (
              <div key={item.id} className="carousel-item" onClick={() => setLightbox(item)}>
                {item.tipo_media === 'video' ? (
                  <video src={item.url} muted playsInline />
                ) : (
                  <img src={item.url} alt={item.titulo || 'Parquet'} loading="lazy" />
                )}
                {item.titulo && <div className="carousel-caption">{item.titulo}</div>}
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <button className="carousel-arrow carousel-next" onClick={() => go(1)} aria-label="Siguiente">›</button>
          )}

          {totalPages > 1 && (
            <div className="carousel-dots">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  className={`carousel-dot ${i === page ? 'active' : ''}`}
                  onClick={() => setPage(i)}
                  aria-label={`Página ${i + 1}`}
                />
              ))}
            </div>
          )}
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
    </main>
  )
}
