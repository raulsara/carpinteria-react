'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useLang } from '../../lib/i18n'

export default function ParquetPage() {
  const { t } = useLang()
  const [items, setItems]     = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage]       = useState(0)

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
  function go(dir) { setPage((page + dir + totalPages) % totalPages) }
  const visible = items.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE)

  return (
    <main className="subpage">
      <div className="subpage-head">
        <span className="section-tag">{t('parquet.tag')}</span>
        <h1 className="section-title">{t('parquet.title')}</h1>
        <p className="section-sub">{t('parquet.subtitle')}</p>
      </div>

      {loading ? (
        <p className="portfolio-empty">{t('parquet.loading')}</p>
      ) : items.length === 0 ? (
        <div className="portfolio-empty">
          <p>{t('parquet.empty')}</p>
          <Link href="/#presupuesto" className="btn-primary" style={{ marginTop: 20, display: 'inline-block' }}>
            {t('parquet.consult')}
          </Link>
        </div>
      ) : (
        <div className="carousel-wrap">
          {totalPages > 1 && (
            <button className="carousel-arrow carousel-prev" onClick={() => go(-1)} aria-label="‹">‹</button>
          )}
          <div className="carousel-track">
            {visible.map(item => (
              <Link key={item.id} href={`/parquet/${item.id}`} className="carousel-item">
                {item.tipo_media === 'video' ? (
                  <video src={item.url} muted playsInline />
                ) : (
                  <img src={item.url} alt={item.nombre || item.titulo || 'Parquet'} loading="lazy" />
                )}
                {(item.nombre || item.titulo) && (
                  <div className="carousel-caption">
                    {item.nombre || item.titulo}
                    {item.sku && <span style={{ opacity: .7, fontSize: '.75rem', display: 'block' }}>{item.sku}</span>}
                  </div>
                )}
              </Link>
            ))}
          </div>
          {totalPages > 1 && (
            <button className="carousel-arrow carousel-next" onClick={() => go(1)} aria-label="›">›</button>
          )}
          {totalPages > 1 && (
            <div className="carousel-dots">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button key={i} className={`carousel-dot ${i === page ? 'active' : ''}`} onClick={() => setPage(i)} aria-label={`${i + 1}`} />
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  )
}
