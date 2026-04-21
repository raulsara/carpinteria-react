'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'
import { renderMarkdown } from '../../../lib/markdown'
import { useLang } from '../../../lib/i18n'

export default function BlogPost({ params }) {
  const { t, lang } = useLang()
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

  const formatDate = (d) => new Date(d).toLocaleDateString(lang === 'ca' ? 'ca-ES' : 'es-ES', { year: 'numeric', month: 'long', day: 'numeric' })

  if (loading) return <main className="subpage"><p className="portfolio-empty">{t('blog.loading')}</p></main>

  if (!post) {
    return (
      <main className="subpage">
        <div className="portfolio-empty">
          <p>{t('blog.notFound')}</p>
          <Link href="/blog" className="btn-primary" style={{ marginTop: 20, display: 'inline-block' }}>{t('blog.viewAll')}</Link>
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

        <footer className="post-footer post-footer-cta">
          <p className="post-footer-text">{t('blog.footerText')}</p>
          <a
            href="https://wa.me/34607826072"
            target="_blank"
            rel="noopener noreferrer"
            className="post-footer-wa"
          >
            <img src="/whatsapp.png" alt="" width="26" height="26" />
            {t('common.chatWhatsApp')}
          </a>
        </footer>
      </article>
    </main>
  )
}
