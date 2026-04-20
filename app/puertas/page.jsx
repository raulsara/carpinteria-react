'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

const CATEGORIAS = [
  {
    slug: 'interiores',
    tipo: 'puertas_interiores',
    titulo: 'Puertas interiores',
    desc:  'Pasillo, habitación, cocina. Maderas nobles y acabados a medida.',
    icon:  '🚪',
  },
  {
    slug: 'exteriores',
    tipo: 'puertas_exteriores',
    titulo: 'Puertas exteriores',
    desc:  'Entrada principal con seguridad y aislamiento. Roble, nogal o castaño.',
    icon:  '🏠',
  },
  {
    slug: 'vidrio',
    tipo: 'puertas_vidrio',
    titulo: 'Puertas con vidrio',
    desc:  'Correderas y batientes con cristal templado para ganar luz en cualquier estancia.',
    icon:  '🪟',
  },
  {
    slug: 'lacadas',
    tipo: 'puertas_lacadas',
    titulo: 'Puertas lacadas',
    desc:  'Acabado liso y moderno en cualquier color RAL. Perfectas para reformas actuales.',
    icon:  '✨',
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
        <Link href="/" className="subpage-back">← Volver al inicio</Link>
        <span className="section-tag">Catálogo</span>
        <h1 className="section-title">Puertas y ventanas</h1>
        <p className="section-sub">Elige la categoría para ver los modelos disponibles.</p>
      </div>

      <div className="cat-grid">
        {CATEGORIAS.map(c => (
          <Link key={c.slug} href={`/puertas/${c.slug}`} className="cat-card">
            <div className="cat-icon">{c.icon}</div>
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
