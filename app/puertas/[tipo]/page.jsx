'use client'
import Link from 'next/link'
import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../lib/supabase'

const CATEGORIAS = {
  interiores: { tipo: 'puertas_interiores', titulo: 'Puertas interiores',   desc: 'Modelos para pasillo, habitación y zonas interiores.' },
  exteriores: { tipo: 'puertas_exteriores', titulo: 'Puertas exteriores',   desc: 'Puertas de entrada con aislamiento y seguridad.' },
  vidrio:     { tipo: 'puertas_vidrio',     titulo: 'Puertas con vidrio',   desc: 'Correderas y batientes con cristal templado.' },
  lacadas:    { tipo: 'puertas_lacadas',    titulo: 'Puertas lacadas',      desc: 'Acabado liso en cualquier color RAL.' },
}

export default function PuertaCategoria({ params }) {
  const { tipo: slug } = use(params)
  const router = useRouter()
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
  }, [cat])

  if (!cat) {
    return (
      <main className="subpage">
        <div className="subpage-head">
          <Link href="/puertas" className="subpage-back">← Volver a Puertas</Link>
          <h1 className="section-title">Categoría no encontrada</h1>
          <button className="btn-primary" onClick={() => router.push('/puertas')}>Ver categorías</button>
        </div>
      </main>
    )
  }

  return (
    <main className="subpage">
      <div className="subpage-head">
        <Link href="/puertas" className="subpage-back">← Volver a Puertas</Link>
        <span className="section-tag">{cat.titulo}</span>
        <h1 className="section-title">Catálogo de {cat.titulo.toLowerCase()}</h1>
        <p className="section-sub">{cat.desc}</p>
      </div>

      {loading ? (
        <p className="portfolio-empty">Cargando catálogo...</p>
      ) : items.length === 0 ? (
        <div className="portfolio-empty">
          <p>Estamos preparando el catálogo de esta categoría.</p>
          <Link href="/#contacto" className="btn-primary" style={{ marginTop: 20, display: 'inline-block' }}>
            Consultar directamente
          </Link>
        </div>
      ) : (
        <div className="portfolio-grid">
          {items.map(item => (
            <div key={item.id} className="portfolio-item" onClick={() => setLightbox(item)}>
              {item.tipo_media === 'video' ? (
                <video src={item.url} className="portfolio-media" muted playsInline />
              ) : (
                <img src={item.url} alt={item.titulo || ''} className="portfolio-media" loading="lazy" />
              )}
              <div className="portfolio-overlay">
                <h4>{item.titulo || cat.titulo}</h4>
              </div>
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
