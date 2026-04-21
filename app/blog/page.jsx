'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useLang } from '../../lib/i18n'

export default function BlogList() {
  const { t, lang } = useLang()
  const [posts, setPosts]     = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('posts')
      .select('id, slug, titulo, subtitulo, resumen, imagen_portada, created_at')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setPosts(data || [])
        setLoading(false)
      })
  }, [])

  const formatDate = (d) => new Date(d).toLocaleDateString(lang === 'ca' ? 'ca-ES' : 'es-ES', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <main className="subpage">
      <div className="subpage-head">
        <span className="section-tag">{t('blog.tag')}</span>
        <h1 className="section-title">{t('blog.title')}</h1>
        <p className="section-sub">{t('blog.subtitle')}</p>
      </div>

      {loading ? (
        <p className="portfolio-empty">{t('blog.loading')}</p>
      ) : posts.length === 0 ? (
        <div className="portfolio-empty">
          <p>{t('blog.empty')}</p>
        </div>
      ) : (
        <div className="blog-grid">
          {posts.map(p => (
            <Link key={p.id} href={`/blog/${p.slug}`} className="blog-card">
              {p.imagen_portada && (
                <div className="blog-card-img">
                  <img src={p.imagen_portada} alt={p.titulo} loading="lazy" />
                </div>
              )}
              <div className="blog-card-body">
                <time className="blog-card-date">{formatDate(p.created_at)}</time>
                <h2>{p.titulo}</h2>
                {p.subtitulo && <p className="blog-card-sub">{p.subtitulo}</p>}
                {p.resumen && <p className="blog-card-resumen">{p.resumen}</p>}
                <span className="blog-card-link">{t('blog.readMore')}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
