'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useLang } from '../../lib/i18n'

export default function PuertasPage() {
  const { t } = useLang()
  const [counts, setCounts] = useState({})

  const CATEGORIAS = [
    { slug: 'interiores', tipo: 'puertas_interiores', titulo: t('puertas.interiores'), desc: t('puertas.interioresDesc'), img: '/iconos/interior.png' },
    { slug: 'exteriores', tipo: 'puertas_exteriores', titulo: t('puertas.exteriores'), desc: t('puertas.exterioresDesc'), img: '/iconos/exterior.png' },
    { slug: 'vidrio',     tipo: 'puertas_vidrio',     titulo: t('puertas.vidrio'),     desc: t('puertas.vidrioDesc'),     img: '/iconos/vidrio.png' },
    { slug: 'lacadas',    tipo: 'puertas_lacadas',    titulo: t('puertas.lacadas'),    desc: t('puertas.lacadasDesc'),    img: '/iconos/lacada.png' },
  ]

  useEffect(() => {
    supabase.from('media')
      .select('tipo_servicio')
      .in('tipo_servicio', CATEGORIAS.map(c => c.tipo))
      .then(({ data }) => {
        const map = {}
        ;(data || []).forEach(r => { map[r.tipo_servicio] = (map[r.tipo_servicio] || 0) + 1 })
        setCounts(map)
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="subpage">
      <div className="subpage-head">
        <span className="section-tag">{t('puertas.tag')}</span>
        <h1 className="section-title">{t('puertas.title')}</h1>
        <p className="section-sub">{t('puertas.subtitle')}</p>
      </div>

      <div className="cat-grid">
        {CATEGORIAS.map(c => (
          <Link key={c.slug} href={`/puertas/${c.slug}`} className="cat-card">
            <div className="cat-icon-img">
              <img src={c.img} alt={c.titulo} />
            </div>
            <h3>{c.titulo}</h3>
            <p>{c.desc}</p>
            <span className="cat-count">
              {counts[c.tipo] ? t('puertas.models')(counts[c.tipo]) : t('puertas.viewCatalog')} →
            </span>
          </Link>
        ))}
      </div>
    </main>
  )
}
