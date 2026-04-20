'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

const IconInterior = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
    <rect x="10" y="5" width="28" height="38" rx="1.5" />
    <rect x="14" y="10" width="20" height="13" rx="0.5" />
    <rect x="14" y="26" width="20" height="13" rx="0.5" />
    <circle cx="32" cy="27" r="1.6" fill="currentColor" />
  </svg>
)

const IconExterior = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
    <rect x="6" y="4" width="36" height="40" rx="2" />
    <rect x="10" y="8" width="28" height="32" rx="1" />
    <rect x="15" y="12" width="18" height="8" rx="0.5" />
    <line x1="24" y1="12" x2="24" y2="20" />
    <line x1="15" y1="16" x2="33" y2="16" />
    <rect x="30" y="28" width="3" height="6" rx="1.2" fill="currentColor" />
  </svg>
)

const IconVidrio = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
    <rect x="10" y="5" width="28" height="38" rx="1.5" />
    <rect x="14" y="10" width="20" height="28" rx="0.5" />
    <line x1="24" y1="10" x2="24" y2="38" strokeOpacity="0.6" />
    <line x1="14" y1="24" x2="34" y2="24" strokeOpacity="0.6" />
    <line x1="17" y1="13" x2="22" y2="13" strokeWidth="1.3" strokeOpacity="0.5" />
    <line x1="17" y1="16" x2="20" y2="16" strokeWidth="1.3" strokeOpacity="0.5" />
  </svg>
)

const IconLacada = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
    <rect x="10" y="5" width="28" height="38" rx="1.5" fill="currentColor" fillOpacity="0.15" />
    <rect x="13" y="8" width="4" height="32" rx="1" fill="currentColor" fillOpacity="0.35" stroke="none" />
    <circle cx="32" cy="26" r="1.6" fill="currentColor" stroke="none" />
    <path d="M22 14 L28 20" strokeWidth="1.3" strokeOpacity="0.5" strokeLinecap="round" />
    <path d="M22 17 L26 21" strokeWidth="1.3" strokeOpacity="0.5" strokeLinecap="round" />
  </svg>
)

const CATEGORIAS = [
  {
    slug: 'interiores',
    tipo: 'puertas_interiores',
    titulo: 'Puertas interiores',
    desc:  'Pasillo, habitación, cocina. Maderas nobles y acabados a medida.',
    Icon:  IconInterior,
  },
  {
    slug: 'exteriores',
    tipo: 'puertas_exteriores',
    titulo: 'Puertas exteriores',
    desc:  'Entrada principal con seguridad y aislamiento. Roble, nogal o castaño.',
    Icon:  IconExterior,
  },
  {
    slug: 'vidrio',
    tipo: 'puertas_vidrio',
    titulo: 'Puertas con vidrio',
    desc:  'Correderas y batientes con cristal templado para ganar luz en cualquier estancia.',
    Icon:  IconVidrio,
  },
  {
    slug: 'lacadas',
    tipo: 'puertas_lacadas',
    titulo: 'Puertas lacadas',
    desc:  'Acabado liso y moderno en cualquier color RAL. Perfectas para reformas actuales.',
    Icon:  IconLacada,
  },
]

export default function PuertasPage() {
  const [counts, setCounts] = useState({})

  useEffect(() => {
    supabase.from('media')
      .select('tipo_servicio')
      .in('tipo_servicio', CATEGORIAS.map(c => c.tipo))
      .then(({ data }) => {
        const map = {}
        ;(data || []).forEach(r => { map[r.tipo_servicio] = (map[r.tipo_servicio] || 0) + 1 })
        setCounts(map)
      })
  }, [])

  return (
    <main className="subpage">
      <div className="subpage-head">
        <span className="section-tag">Catálogo</span>
        <h1 className="section-title">Puertas y ventanas</h1>
        <p className="section-sub">Elige la categoría para ver los modelos disponibles.</p>
      </div>

      <div className="cat-grid">
        {CATEGORIAS.map(c => (
          <Link key={c.slug} href={`/puertas/${c.slug}`} className="cat-card">
            <div className="cat-icon"><c.Icon /></div>
            <h3>{c.titulo}</h3>
            <p>{c.desc}</p>
            <span className="cat-count">
              {counts[c.tipo] ? `${counts[c.tipo]} modelo${counts[c.tipo] > 1 ? 's' : ''}` : 'Ver catálogo'} →
            </span>
          </Link>
        ))}
      </div>
    </main>
  )
}
