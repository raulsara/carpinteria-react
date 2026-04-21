'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

function formatDate(d) {
  return new Date(d).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function BlogList() {
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

  return (
    <main className="subpage">
      <div className="subpage-head">
        <span className="section-tag">Blog</span>
        <h1 className="section-title">Ideas, consejos y proyectos</h1>
        <p className="section-sub">Todo sobre el mundo de la madera, los trabajos que hacemos y las técnicas del oficio.</p>
      </div>

      {loading ? (
        <p className="portfolio-empty">Cargando artículos...</p>
      ) : posts.length === 0 ? (
        <div className="portfolio-empty">
          <p>Aún no hay artículos publicados. ¡Vuelve pronto!</p>
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
                <span className="blog-card-link">Leer más →</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
