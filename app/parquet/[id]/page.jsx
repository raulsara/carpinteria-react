'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'

const SPEC_LABELS = [
  ['coleccion',        'Colección'],
  ['sku',              'SKU'],
  ['formato',          'Formato'],
  ['formato_busqueda', 'Formato de búsqueda'],
  ['stock',            'Stock'],
  ['uso',              'Uso'],
  ['sector',           'Sector'],
  ['packaging',        'Packaging'],
  ['anclaje',          'Anclaje'],
  ['un_venta',         'Un. venta'],
  ['bisel',            'Bisel'],
]

export default function ParquetFicha({ params }) {
  const id = params?.id
  const [item, setItem]       = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    supabase.from('media').select('*').eq('id', id).single()
      .then(({ data }) => {
        setItem(data)
        setLoading(false)
      })
  }, [id])

  if (loading) return <main className="subpage"><p className="portfolio-empty">Cargando ficha...</p></main>

  if (!item) {
    return (
      <main className="subpage">
        <div className="portfolio-empty">
          <p>No se ha encontrado este producto.</p>
          <Link href="/parquet" className="btn-primary" style={{ marginTop: 20, display: 'inline-block' }}>Ver catálogo</Link>
        </div>
      </main>
    )
  }

  const nombre = item.nombre || item.titulo || 'Parquet'
  const specs = SPEC_LABELS.filter(([k]) => item[k])

  return (
    <main className="subpage subpage-ficha">
      <div className="ficha-wrap">
        <div className="ficha-img">
          {item.tipo_media === 'video'
            ? <video src={item.url} controls />
            : <img src={item.url} alt={nombre} />}
        </div>
        <div className="ficha-info">
          <h1 className="ficha-title">
            {nombre}
            {item.sku && <span className="ficha-sku"> – {item.sku}</span>}
          </h1>
          <p className="ficha-disclaimer">* hasta fin de existencias</p>
          <dl className="ficha-specs">
            {specs.map(([key, label]) => (
              <div key={key} className="ficha-row">
                <dt>{label}:</dt>
                <dd>{item[key]}</dd>
              </div>
            ))}
          </dl>
          <Link href="/#contacto" className="btn-primary" style={{ marginTop: 32, display: 'inline-block' }}>
            Pedir presupuesto
          </Link>
        </div>
      </div>
    </main>
  )
}
