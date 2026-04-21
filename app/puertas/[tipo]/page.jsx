'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../lib/supabase'
import { useLang } from '../../../lib/i18n'

export default function PuertaCategoria({ params }) {
  const { t } = useLang()
  const slug = params?.tipo
  const router = useRouter()

  const CATEGORIAS = {
    interiores: { tipo: 'puertas_interiores', titulo: t('puertas.interiores'),   desc: t('puertas.interioresDesc') },
    exteriores: { tipo: 'puertas_exteriores', titulo: t('puertas.exteriores'),   desc: t('puertas.exterioresDesc') },
    vidrio:     { tipo: 'puertas_vidrio',     titulo: t('puertas.vidrio'),       desc: t('puertas.vidrioDesc') },
    lacadas:    { tipo: 'puertas_lacadas',    titulo: t('puertas.lacadas'),      desc: t('puertas.lacadasDesc') },
  }
  const cat = CATEGORIAS[slug]

  const [items, setItems]     = useState([])
  const [loading, setLoading] = useState(true)
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    if (!cat) return
    supabase.from('media')
      .select('*')
      .eq('tipo_servicio', cat.tipo)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setItems(data || [])
        setLoading(false)
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  if (!cat) {
    return (
      <main className="subpage">
        <div className="subpage-head">
          <h1 className="section-title">{t('puertas.notFound') || 'Categoría no encontrada'}</h1>
          <button className="btn-primary" onClick={() => router.push('/puertas')}>{t('puertas.viewCatalog')}</button>
        </div>
      </main>
    )
  }

  return (
    <main className="subpage">
      <div className="subpage-head">
        <span className="section-tag">{cat.titulo}</span>
        <h1 className="section-title">{t('puertas.catalogOf')(cat.titulo)}</h1>
        <p className="section-sub">{cat.desc}</p>
      </div>

      {loading ? (
        <p className="portfolio-empty">{t('puertas.loading')}</p>
      ) : items.length === 0 ? (
        <div className="portfolio-empty">
          <p>{t('puertas.empty')}</p>
          <Link href="/#presupuesto" className="btn-primary" style={{ marginTop: 20, display: 'inline-block' }}>
            {t('puertas.consult')}
          </Link>
        </div>
      ) : (
        <div className="portfolio-grid">
          {items.map(item => (
            <div key={item.id} className="portfolio-card">
              <div className="portfolio-item" onClick={() => setLightbox(item)}>
                {item.tipo_media === 'video' ? (
                  <video src={item.url} className="portfolio-media" muted playsInline />
                ) : (
                  <img src={item.url} alt={item.titulo || ''} className="portfolio-media" loading="lazy" />
                )}
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
    </main>
  )
}
