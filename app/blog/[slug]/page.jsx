'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'
import { renderMarkdown } from '../../../lib/markdown'

function formatDate(d) {
  return new Date(d).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function BlogPost({ params }) {
  const slug = params?.slug
  const [post, setPost]       = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    supabase.from('posts').select('*').eq('slug', slug).eq('published', true).single()
      .then(({ data }) => {
        setPost(data)
        setLoading(false)
        if (data?.titulo) document.title = `${data.titulo} — MaderArte`
      })
  }, [slug])

  if (loading) return <main className="subpage"><p className="portfolio-empty">Cargando artículo...</p></main>

  if (!post) {
    return (
      <main className="subpage">
        <div className="portfolio-empty">
          <p>No se ha encontrado este artículo.</p>
          <Link href="/blog" className="btn-primary" style={{ marginTop: 20, display: 'inline-block' }}>Ver todos los artículos</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="subpage">
      <article className="post-wrap">
        <header className="post-header">
          <time className="post-date">{formatDate(post.created_at)}</time>
          <h1 className="post-title">{post.titulo}</h1>
          {post.subtitulo && <p className="post-subtitle">{post.subtitulo}</p>}
        </header>

        {post.imagen_portada && (
          <div className="post-cover">
            <img src={post.imagen_portada} alt={post.titulo} />
          </div>
        )}

        <div className="post-content">
          {renderMarkdown(post.contenido)}
        </div>

        <footer className="post-footer">
          <Link href="/blog" className="post-back">← Ver todos los artículos</Link>
          <Link href="/#presupuesto" className="btn-primary">Pedir presupuesto</Link>
        </footer>
      </article>
    </main>
  )
}
